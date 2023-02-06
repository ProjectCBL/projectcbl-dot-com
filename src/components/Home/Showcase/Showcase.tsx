import Lorem from "../../../util/Lorem";
import Panel from "../../shared/Panel";

function Showcase () {
    return <Panel
        height="h-[19em]"
        width="w-[19em]"
        bgColor="bg-[#121212]"
        additionalStyles={[
            "text-sm",
            "text-white",
            "border-[#2b2b2b]",
            "border",
        ]}
    >
        <div className="mx-4 my-4">
            <div className="text-xl">Showcase</div>
            <div className="truncate">
                {Lorem.small}
            </div>
        </div>
    </Panel>
}

export default Showcase;