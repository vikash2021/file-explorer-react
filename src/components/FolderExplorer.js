import { useState } from "react";

const FolderExplorer = ({ handleNodeInsertion, explorerData }) => {
  const [expandFolder, setExpandFolder] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });

  function buttonHandler(e, isFolder) {
    setExpandFolder(true);
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder
    });
  }

  function folderAdditionHandler(e) {
    if (e.keyCode === 13 && e.target.value) {
      handleNodeInsertion(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  }

  console.log("Data@", explorerData);
  if (explorerData.isFolder) {
    return (
      <div style={{ marginTop: 10 }}>
        <div onClick={() => setExpandFolder(!expandFolder)} className="folder">
          <span>📁 {explorerData.name}</span>
          <div>
            <button onClick={(e) => buttonHandler(e, true)}>Folder ➕</button>
            <button onClick={(e) => buttonHandler(e, false)}>File ➕</button>
          </div>
        </div>
        <div
          style={{ display: expandFolder ? "block" : "none", paddingLeft: 20 }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainerInput"
                autoFocus
                onKeyDown={(e) => folderAdditionHandler(e)}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorerData?.items.map((data) => {
            return (
              <FolderExplorer
                explorerData={data}
                handleNodeInsertion={handleNodeInsertion}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorerData.name}</span>;
  }
};

export default FolderExplorer;
