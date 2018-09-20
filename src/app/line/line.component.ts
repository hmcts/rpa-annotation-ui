import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  @Input() svg;
  @Input() source: ElementRef;
  @Input() target: HTMLElement;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.source);
    console.log(this.target);
    this.connectDivs(this.target, this.source, "blue", 0.2);
  }

  findAbsolutePosition(htmlElement: any) {
    var x = <number>htmlElement.offsetLeft;
    var y = <number>htmlElement.offsetTop;
    for (var x=0, y=0, el=htmlElement; 
         el != null; 
         el = el.offsetParent) {
           x += el.offsetLeft;
           y += el.offsetTop;
    }
    return {
        "x": x,
        "y": y
    };
  }

  connectDivs(target, source, color, tension) {

    var leftPos = this.findAbsolutePosition(target);
    var x1 = leftPos.x;
    var y1 = leftPos.y;
    x1 += target.offsetWidth;
    y1 += (target.offsetHeight / 2);
  
    console.log(leftPos);

    var rightPos = this.findAbsolutePosition(source);
    var x2 = rightPos.x;
    var y2 = rightPos.y;
    y2 += (source.offsetHeight / 2);
  
    console.log(rightPos);
    
    // var width=x2-x1;
    // var height = y2-y1;
  
    // this.drawCircle(x1, y1, 3, color);
    // this.drawCircle(x2, y2, 3, color);
    this.drawCurvedLine(x1, y1, x2, y2, color, tension);
  }


//   drawCircle(x, y, radius, color) {
// 	    var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     shape.setAttributeNS(null, "cx", x);
//     shape.setAttributeNS(null, "cy", y);
//     shape.setAttributeNS(null, "r",  radius);
//     shape.setAttributeNS(null, "fill", color);
//     this.svg.appendChild(shape);
// }

  drawCurvedLine(x1, y1: number, x2: number, y2, color, tension) {
    var shape = document.createElementNS("http://www.w3.org/2000/svg", 
                                         "path");{

    if (tension<0) {
        var delta = (y2-y1)*tension;
        var hx1=x1;
        var hy1=y1-delta;
        var hx2=x2;
        var hy2=y2+delta;
        var path = "M " + x1 + " " + y1 + 
                  " C " + hx1 + " " + hy1 + " "  
                        + hx2 + " " + hy2 + " " 
                        + x2 + " " + y2;
    } else {
        var delta = (x2-x1)*tension;
        var hx1=x1+delta;
        var hy1=y1;
        var hx2=x2-delta;
        var hy2=y2;
        var path = "M " + x1 + " " + y1 + 
                  " C " + hx1 + " " + hy1 + " "  
                        + hx2 + " " + hy2 + " " 
                        + x2 + " " + y2;
    }

    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    this.svg.appendChild(shape);
    }
  }
}
