import tractorImage from '@/assets/images/contacts/tractor.png'
import EmailIcon from '@/components/icons/EmailIcon'
import MapIcon from '@/components/icons/MapIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import Container from '@/components/ui/common/container/Container'
import Image from '@/components/ui/common/image/Image'
import { EMAIL } from '@/constants/global/global.constants'
import { OTHER_ROUTE } from '@/constants/route/route.constants'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Contacts.module.scss'

const Contacts: FC = () => {
	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<div className={styles.box}>
							<div className={styles.head}>
								<h1 className={styles.heading}>Контактная информация</h1>
								<ul className={styles.requisites}>
									<li className={styles.requisite}>
										ИП Дегтярь Ольга Николаевна
									</li>
									<li className={styles.requisite}>ИНН 310501377884</li>
									<li className={styles.requisite}>ОГРН 322312300000990</li>
								</ul>
							</div>
							<ul className={styles.items}>
								<li className={styles.item}>
									<div className={styles.icon}>
										<EmailIcon />
									</div>
									<div className={styles.box}>
										<div className={styles.label}>Техническая поддержка</div>
										<Link
											className={styles.value}
											href={OTHER_ROUTE.EMAIL(EMAIL)}
										>
											{EMAIL}
										</Link>
									</div>
								</li>
								<li className={styles.item}>
									<div className={styles.icon}>
										<MapIcon />
									</div>
									<div className={styles.box}>
										<div className={styles.label}>Адрес</div>
										<p className={styles.value}>
											308025, г. Белгород, ул. Горелика, д. 16
										</p>
									</div>
								</li>
								<li className={styles.item}>
									<div className={styles.icon}>
										<PhoneIcon />
									</div>
									<div className={styles.box}>
										<div className={styles.label}>Телефон для связи</div>
										<Link
											className={styles.value}
											href={OTHER_ROUTE.PHONE(89803706402)}
										>
											8 980 370-64-02
										</Link>
									</div>
								</li>
							</ul>
						</div>
						<Image src={tractorImage.src} alt="Спецтехника" />
					</div>
				</div>
			</Container>
		</section>
	)
}

export default Contacts
