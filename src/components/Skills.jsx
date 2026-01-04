function Mindmap() {
  const skills = [
    "Java", 
    "Python", 
    "React", 
    "HTML/CSS", 
    "SQL", 
    "Git/GitHub", 
    "Linux", 
    "Teamwork", 
    "Communication"
  ];

  return (
    <div className="formation">
      <h1 className="formation-name">Skills Mindmap</h1>
      <div className="mindmap">
        <div className="mindmap-center">Skills</div>
        {skills.map((skill, idx) => (
          <div key={idx} className={`mindmap-node node-${idx}`}>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mindmap;
