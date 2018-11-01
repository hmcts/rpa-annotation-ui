import {Component, OnInit, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import {IAnnotationSet, Annotation} from '../../data/annotation-set.model';
import {NpaService} from '../../data/npa.service';
import {ApiHttpService} from '../../data/api-http.service';
import { ContextualToolbarComponent } from '../contextual-toolbar/contextual-toolbar.component';
import { Utils } from '../../data/utils';

@Component({
    selector: 'app-annotation-pdf-viewer',
    templateUrl: './annotation-pdf-viewer.component.html',
    styleUrls: ['./annotation-pdf-viewer.component.scss'],
    providers: []
})
export class AnnotationPdfViewerComponent implements OnInit {

    @Input() annotate: boolean;
    @Input() dmDocumentId: string;
    @Input() outputDmDocumentId: string;
    @Input() url: string;
    @Input() annotationSet: IAnnotationSet;
    @Input() baseUrl: string;

    renderedPages: {};
    page: number;

    @ViewChild('contentWrapper') contentWrapper: ElementRef;
    @ViewChild(ContextualToolbarComponent) contextualToolbar: ContextualToolbarComponent;
    @ViewChild('viewer') viewerElementRef: ElementRef;

    constructor(private pdfService: PdfService,
                private npaService: NpaService,
                private apiHttpService: ApiHttpService,
                private annotationStoreService: AnnotationStoreService,
                private utils: Utils,
                @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.loadAnnotations(this.annotate);
        this.pdfService.preRun();
        this.pdfService.setRenderOptions({
            documentId: this.url,
            pdfDocument: null,
            scale: parseFloat('1.33'),
            rotate: parseInt(localStorage.getItem(this.url + '/rotate'), 10) || 0
        });

        this.renderedPages = {};
        this.pdfService.render(this.viewerElementRef);
        this.pdfService.setHighlightTool();
        this.pdfService.getPageNumber().subscribe(page => this.page = page);
    }

    loadAnnotations(annotate: boolean) {
        if (annotate) {
            this.apiHttpService.setBaseUrl(this.baseUrl);
            this.annotationStoreService.preLoad(this.annotationSet);
            this.npaService.outputDmDocumentId.next(this.outputDmDocumentId);
        } else {
            this.annotationStoreService.preLoad(null);
        }
    }

    getClickedPage(event: any) {
        if (!this.utils.clickIsHighlight(event)) {
            this.annotationStoreService.setCommentBtnSubject(null);
            this.annotationStoreService.setCommentFocusSubject(
                new Annotation(null, null, null, null, null, null, null, null, null, null, null, null), null);
        }

        let currentParent = event.target;
        for (let step = 0; step < 5; step++) {
            if (currentParent.parentNode != null) {
                const pageNumber = currentParent.parentNode.getAttribute('data-page-number');
                if (pageNumber != null) {
                    this.pdfService.setPageNumber(parseInt(pageNumber, null));
                    break;
                }
                currentParent = currentParent.parentNode;
            }
        }
    }
}
