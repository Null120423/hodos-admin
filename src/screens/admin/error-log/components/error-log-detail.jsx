import { Button, Tag } from "rsuite";

const getJsonIndented = (obj) => JSON.stringify(obj, null, 4);

const JSONDisplayer = ({ children }) => (
    <div>
        <pre>{getJsonIndented(children)}</pre>
    </div>
);

function ErrorLogViewDetail({ data }) {
    return (
       <div className="flex flex-col gap-4">
          <div>
              {
      data?.isFixed ? (
        <Tag color='green'>Fixed</Tag>
      ) : (
        <Tag color='orange'>Un Fixed</Tag>
      )
    }
          </div>
         <div className="bg-black/5 p-4 rounded-lg">
         {data?.project}
        </div>
          <div className="bg-green-300 p-4 rounded-lg">
          <h1>Error</h1>
            <JSONDisplayer>{JSON.parse(data?.error)}</JSONDisplayer>
        </div>
          <div className="bg-red-600 p-4 rounded-lg">
          <h1>Request</h1>
            <JSONDisplayer>{JSON.parse(data?.request)}</JSONDisplayer>
        </div>
           <Button onClick={() => {
            window.open(data?.source, '_blank');
           }} appearance="link">
                {data?.source}
            </Button>
       </div>
    );
}

export default ErrorLogViewDetail;