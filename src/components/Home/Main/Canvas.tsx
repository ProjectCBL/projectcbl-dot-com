import Panel from "../../shared/Panel";
import Sketch from "react-p5";
import p5Types from 'p5';
import {createRef, Ref, useEffect, useRef} from "react";

function Canvas () {

    const panelRef = useRef<HTMLDivElement>(null);

    function setup (p5: p5Types, canvasParentRef: Element) {
        console.log(canvasParentRef);
        const WIDTH: number = panelRef.current ? panelRef.current.offsetWidth : 0;
        const HEIGHT: number = panelRef.current ? panelRef.current.offsetHeight : 0;
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    }

    function draw (p5: p5Types) {
        p5.background(0);
    }

    return <div ref={panelRef}>
        <Panel
            height="h-[22em]"
            width="w-[40em]"
            roundedCorners="rounded-t-xl"
            additionalStyles={[
                "text-black",
                "flex",
                "justify-center",
                "items-center"
            ]}
        >
            <Sketch setup={setup} draw={draw} />
        </Panel>
    </div>
}

export default Canvas;