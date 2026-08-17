export default function PeopleList({
  title,
  people,
}) {
  return (
    <div>
      <small className="section-label">
        {title}
      </small>

      {people.length ? (
        people.map((person) => (
          <div
            className="person-row"
            key={person.name}
          >
            <strong>{person.name}</strong>
            <span>{person.role}</span>
          </div>
        ))
      ) : (
        <p className="empty-copy">
          Not assigned
        </p>
      )}
    </div>
  );
}