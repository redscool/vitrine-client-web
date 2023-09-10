import styles from "../../../../styles/components/space/page/template/Sky.module.css";

export default function Sky({ pageData, transactHandler }) {
	return (
		<div className={styles.container}>
			<img
				src={pageData.banner}
				className={styles.banner}
				alt=""
			/>
			<div className={styles.profileImgContainer}>
				<img
					src={pageData.profileImg}
					className={styles.profileImg}
					alt=""
				/>
			</div>
			<div className={styles.headingContainer}>
				<h1>{pageData.heading}</h1>
				<h3>{pageData.subHeading}</h3>
				<div className={styles.button}>
					<h3>DM</h3>
				</div>
			</div>
			<div className={styles.horizontalDivider} />
			<div className={styles.pageContent}>
				<div className={styles.pageContentDescription}>
					<h1>Highlights</h1>
					{pageData.highlights?.map((point, indx) => {
						return <h3 key={indx}>{point}</h3>;
					})}
					<h1>Description</h1>
					<p>{pageData.description}</p>
				</div>
				<div className={styles.verticalDivider} />
				<div className={styles.pageContentAction}>
					<h5>5 subscribers </h5>
					<h5>2 posts</h5>
					<h2>$99 / month</h2>
					<p>Cancel Anytime</p>
					<div
						className={styles.buyButton}
						onClick={() => transactHandler(pageData.id)}
					>
						<h3>Join Now</h3>
					</div>
					<h4>
						<a href="#.">Share</a>
					</h4>
				</div>
			</div>
			<div className={styles.follow}>
				<h1>Follow</h1>
				<div className={styles.followIcons}>
					<a href="#.">
						<img
							src="/twitter.svg"
							alt="twitter"
						/>
					</a>
					<a href="#.">
						<img
							src="/gaffar.png"
							alt="gaffar"
						/>
					</a>
					<a href="#.">
						<img
							src="/mail.svg"
							alt="mail"
						/>
					</a>
				</div>
			</div>
			<div className={styles.footer}>
				<h1>
					<span>Powered By</span>Baljeetkode
				</h1>
			</div>
		</div>
	);
}
