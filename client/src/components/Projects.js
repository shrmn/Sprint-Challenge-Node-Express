import React from 'react';
import Project from './Project';

export default (props) => {
  return (
    <div>
      {props.projects.map(project => {
        return (
          <Project
            key={project.id}
            name={project.name}
            description={project.description}
          />
        )
      })}
    </div>
  )
};