import Lorem from "../../util/Lorem";

function Welcome () {
    return <div className="mx-4 my-4">
        <div className="text-xl">ProjectCBL</div>
        <div className="text-sm text-justify mt-1">
            {Lorem.small}
        </div>
    </div>
}

export default Welcome;