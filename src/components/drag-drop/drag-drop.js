import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import classe from "./drag-drop.module.css";
const DragAndDrop = () => {
  const [files, setFiles] = useState([]);
  const [classDrag, setClassDrag] = useState([classe.DragAndDrop]);
  //   let classDrag = [classe.DragAndDrop];

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
      setClassDrag([classe.DragAndDrop]);
    },

    onDragEnter: () => {
      setClassDrag([...classDrag, classe.EnterDrag]);
      console.log("Enter On Drag ", classDrag);
    },
    onDragLeave: () => {
      setClassDrag([classe.DragAndDrop]);
      console.log("Leave on Drag");
    },
    onDragOver: () => {
      console.log("Over the drag");
    },
    onDropRejected: () => {
      setClassDrag([classe.DragAndDrop]);
      console.log("drag rejected");
    },
  });

  //   DELETE FILE
  const _delelte_file = (idx) => {
    const newfiles = files.filter((item, i) => i !== idx);
    setFiles(newfiles);
  };
  const images = files.map((file, idx) => (
    <div className={classe.imageDisplay} key={idx}>
      <img src={file.preview} alt="image" key={idx} className={classe.images} />
      <button onClick={() => _delelte_file(idx)}>Remove</button>
    </div>
  ));

  return (
    <div>
      <h1>DRAG AND DROP</h1>
      <div className={classDrag.join(" ")} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and Drop Here</p>
      </div>
      <div className={classe.mainImages}>{images}</div>
    </div>
  );
};

export default DragAndDrop;
