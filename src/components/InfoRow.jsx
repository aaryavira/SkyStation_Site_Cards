export default function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}) {
  return (
    <div className="info-row">
      <span className="row-icon">
        <Icon size={15} />
      </span>

      <div>
        <small>{label}</small>

        {href ? (
          <strong>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-link"
            >
              {value} ↗
            </a>
          </strong>
        ) : (
          <strong>{value}</strong>
        )}
      </div>
    </div>
  );
}