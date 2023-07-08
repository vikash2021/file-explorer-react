import "./styles.css";
import explorerData from "./explorerData/explorerData";
import FolderExplorer from "./components/FolderExplorer";
import { useState } from "react";
import useTraverseTree from "./hooks/useTraverseTree";

export default function App() {
  const [data, setData] = useState(explorerData);
  const { insertNode } = useTraverseTree();

  const handleNodeInsertion = (folderId, item, isFolder) => {
    const finalData = insertNode(data, folderId, item, isFolder);
    setData(finalData);
  };

  return (
    <div className="App">
      <FolderExplorer
        handleNodeInsertion={handleNodeInsertion}
        explorerData={data}
      />
    </div>
  );
}
