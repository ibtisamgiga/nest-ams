const imageStyle = (enlarge) => {
  return {
    width: enlarge ? 400 : 70,
    height: enlarge ? 400 : 70,
  
  };
};
const imageBoxStyle={ display: "flex", alignContent: "center", flexWrap: "wrap",flexDirection:'column' }
const imageBoxContainer={ display: "flex", alignContent: "center", flexWrap: "wrap",flexDirection:'row' }
export{imageStyle,imageBoxStyle,imageBoxContainer}