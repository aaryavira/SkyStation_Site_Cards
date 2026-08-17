import {
  UserRound,
  Sun,
  Moon,
  Headset,
  Phone,
} from "lucide-react";

/* ==========================================================
   STAKEHOLDER CARD
   ----------------------------------------------------------
   Supports:
   - Multiple Day Operations personnel
   - Multiple Night Operations personnel
   - Multiple On-Field Support personnel
   - Contact number for On-Field Support
   - Dynamic Firestore-ready data
   - Frontend-controlled icons
========================================================== */

export default function StakeholderCard({
  stakeholders = {},
}) {
  /* ========================================================
     FIRESTORE DATA
  ======================================================== */

  const dayOperations = Array.isArray(
    stakeholders?.dayOperations
  )
    ? stakeholders.dayOperations
    : [];

  const nightOperations = Array.isArray(
    stakeholders?.nightOperations
  )
    ? stakeholders.nightOperations
    : [];

  const onFieldSupport = Array.isArray(
    stakeholders?.onFieldSupport
  )
    ? stakeholders.onFieldSupport
    : [];

  /* ========================================================
     RENDER PERSON ROW
  ======================================================== */

  const renderPersonRow = ({
    person,
    showContact = false,
  }) => {
    if (!person) return null;

    return (
      <div
        className="stakeholder-person-row"
        key={
          person.id ??
          person.personNo ??
          person.personName
        }
      >
        {/* ==================================================
            PERSON NUMBER
        ================================================== */}

        <div className="stakeholder-person-no">
          {person.personNo ??
            person.id ??
            "--"}
        </div>

        {/* ==================================================
            PERSON NAME
        ================================================== */}

        <div className="stakeholder-person-name">
          <strong>
            {person.personName || "--"}
          </strong>
        </div>

        {/* ==================================================
            DESIGNATION
        ================================================== */}

        <div className="stakeholder-designation">
          {person.designation || "--"}
        </div>

        {/* ==================================================
            CONTACT NUMBER
            ON-FIELD SUPPORT ONLY
        ================================================== */}

        {showContact && (
          <div className="stakeholder-contact">
            {person.contactNumber ? (
              <a
                href={`tel:${person.contactNumber}`}
                className="stakeholder-phone"
                title={`Call ${
                  person.personName || "contact"
                }`}
              >
                <Headset size={14} />

                <span>
                  {person.contactNumber}
                </span>
              </a>
            ) : (
              <span>--</span>
            )}
          </div>
        )}
      </div>
    );
  };

  /* ========================================================
     RENDER SECTION
  ======================================================== */

  const renderSection = ({
    title,
    icon: Icon,
    people,
    showContact = false,
  }) => {
    return (
      <div className="stakeholder-section">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="stakeholder-section-header">

          <div className="stakeholder-section-title">

            <Icon size={16} />

            <span>
              {title}
            </span>

          </div>

        </div>


        {/* ==================================================
            TABLE HEADER
        ================================================== */}

        <div
          className={`stakeholder-table-header ${
            showContact
              ? "has-contact"
              : ""
          }`}
        >

          <span>
            PERSON NO.
          </span>

          <span>
            {title === "Day Operations" ||
            title === "Night Operations"
              ? "OPERATOR NAME"
              : "PERSON NAME"}
          </span>

          <span>
            DESIGNATION
          </span>

          {showContact && (
            <span>
              CONTACT NUMBER
            </span>
          )}

        </div>


        {/* ==================================================
            PEOPLE
        ================================================== */}

        {people.length > 0 ? (

          <div className="stakeholder-people">

            {people.map(
              (person, index) =>
                renderPersonRow({
                  person: {
                    ...person,

                    personNo:
                      person.personNo ??
                      person.id ??
                      index + 1,
                  },

                  showContact,
                })
            )}

          </div>

        ) : (

          <div className="stakeholder-empty">
            No personnel available
          </div>

        )}

      </div>
    );
  };


  /* ========================================================
     UI
  ======================================================== */

  return (

    <section className="detail-card stakeholder-card">

      {/* ====================================================
          CARD HEADER
      ==================================================== */}

      <div className="detail-card-header">

        <h3>

          {/* SITE STAKEHOLDERS ICON */}

          <UserRound size={18} />

          <span>
            Site Stakeholders
          </span>

        </h3>

      </div>


      {/* ====================================================
          DAY OPERATIONS
          ICON: SUN
      ==================================================== */}

      {renderSection({

        title: "Day Operations",

        icon: Sun,

        people:
          dayOperations,

      })}


      {/* ====================================================
          NIGHT OPERATIONS
          ICON: MOON
      ==================================================== */}

      {renderSection({

        title: "Night Operations",

        icon: Moon,

        people:
          nightOperations,

      })}


      {/* ====================================================
          ON-FIELD SUPPORT
          ICON: HEADSET
      ==================================================== */}

      {renderSection({

        title: "On-Field Support",

        icon: Headset,

        people:
          onFieldSupport,

        showContact: true,

      })}

    </section>
  );
}