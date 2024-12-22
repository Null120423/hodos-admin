import { Button, Tag } from "rsuite";

const getJsonIndented = (obj) => JSON.stringify(obj, null, 4);

const JSONDisplayer = ({ children }) => (
    <div>
        <pre>{getJsonIndented(children)}</pre>
    </div>
);

function BuildLogDetailView({ data }) {
    return (
       <div className="flex flex-col gap-4">
          <div>
              {
      data?.message?.includes('completed') ? (
        <Tag color='green'>Completed</Tag>
      ) : (
        <Tag color='orange'>In Progress</Tag>
      )
    }
          </div>
         <div className="bg-black/5 p-4 rounded-lg">
            <JSONDisplayer>{data}</JSONDisplayer>
        </div>
           <Button onClick={() => {
            window.open(data?.githubBuildLink, '_blank');
           }} appearance="link">
                {data?.githubBuildLink}
            </Button>
       </div>
    );
}

export default BuildLogDetailView;