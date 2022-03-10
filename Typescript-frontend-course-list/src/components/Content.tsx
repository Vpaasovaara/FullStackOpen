import { CoursePart } from "../types";

const Content = (props: ContentProps) => {

  const caseNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  return (
    <div>
      {
        props.courseParts.map((part: CoursePart, i: number) => {
          switch (part.type) {
            case 'normal':
              return (
              <div key={i}>
                <p>
                  {part.name} <b>{part.exerciseCount}</b>
                  <br/>{part.description}
                </p>
              </div>
            );
            case 'groupProject':
              return (
              <div key={i}>
                <p>
                  {part.name} <b>{part.exerciseCount}</b>
                  <br/>Project members: {part.groupProjectCount}
                </p>
              </div>
            );
            case 'submission':
              return (
              <div key={i}>
                <p>
                  {part.name} <b>{part.exerciseCount}</b>
                  <br/>{part.description}
                  <br/>{part.exerciseSubmissionLink}
                </p>
              </div>
            );
            case 'special':
              return(
              <div key={i}>
                <p>
                  {part.name} <b>{part.exerciseCount}</b>
                  <br/>{part.description}
                  <br/> Requirements: {part.requirements.map((requirement: string, i: number) => <li key={i}>{requirement}</li>)}
                </p>
              </div>
            );
            default:
              return caseNever(part);
          }
        })
      }
    </div>
  )
}
interface ContentProps {
    courseParts: Array<CoursePart>;
}

export default Content;