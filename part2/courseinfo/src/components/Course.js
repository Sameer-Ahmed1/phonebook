const Header = ({ headerText }) => <h1>{headerText}</h1>;
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
const Footer = ({ footerText }) => <h3>{footerText}</h3>;
const Course = ({ course }) => {
  const numberOfExercises = course.parts.reduce(
    (sum, part) => (sum += part.exercises),
    0
  );
  return (
    <div>
      <Header headerText={course.name} />
      <Content parts={course.parts} />
      <Footer footerText={`Number of Exercises ${numberOfExercises}`} />
    </div>
  );
};
export default Course;
