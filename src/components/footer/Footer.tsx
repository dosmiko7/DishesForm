import classes from "./Footer.module.scss";
import { FaLinkedin, FaGithub } from "react-icons/fa";
const Footer = () => {
	return (
		<footer className={classes.footer}>
			<div className={classes.footer__links}>
				<h3 className={classes.footer__heading}>Contact me</h3>
				<ul className={classes.footer__list}>
					<li className={classes.footer__item}>
						<a
							href="https://www.linkedin.com/in/miko%C5%82aj-oberda-4a1475240/"
							target="_blank"
							rel="noreferrer"
						>
							<FaLinkedin />
						</a>
					</li>
					<li className={classes.footer__item}>
						<a
							href="https://github.com/dosmiko7"
							target="_blank"
							rel="noreferrer"
						>
							<FaGithub />
						</a>
					</li>
				</ul>
				<a
					className={classes.footer__mail}
					href="mailto:mikolaj.oberda@gmail.com"
				>
					mikolaj.oberda@gmail.com
				</a>
			</div>
			<div className={classes.footer__copyright}>
				<p>&#169; Designed and coded by Mikołaj Oberda</p>
			</div>
		</footer>
	);
};

export default Footer;
