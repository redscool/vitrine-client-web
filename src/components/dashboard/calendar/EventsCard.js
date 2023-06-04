import styles from "../../../styles/components/dashboard/calendar/EventsCard.module.css";
export default function EventsCard({ startTime, endTime, title, description }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.time}>
        <p>
          {startTime} - {endTime}
        </p>
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.description}>
        <p>
          Libero id netus vel arcu. Iaculis sollicitudin ullamcorper morbi
          iaculis tempus. Aptent cum laoreet lacinia. Morbi per curabitur
          malesuada? Quis interdum cursus curabitur suscipit imperdiet facilisi
          lobortis hac vivamus ipsum. Dui risus magnis montes bibendum sapien ac
          justo? Iaculis aliquet urna venenatis et egestas tempor augue. Nisi
          nullam pharetra molestie vitae ultricies curae; est imperdiet eleifend
          a id! Vehicula natoque, duis sem dapibus lectus vehicula consectetur
          in! Odio nunc urna ipsum libero curae; molestie natoque. Odio
          imperdiet nibh aliquam.
        </p>
      </div>
    </div>
  );
}
