import Panel from "../../shared/Panel";

function Canvas () {
    return <div>
        <Panel
            height="h-[22em]"
            width="w-[4oem]"
            roundedCorners="rounded-t-xl"
            additionalStyles={[
                "text-black",
                "flex",
                "justify-center",
                "items-center"
            ]}
        >
            In Construction
        </Panel>
    </div>
}

export default Canvas;