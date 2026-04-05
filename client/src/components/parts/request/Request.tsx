import { Status } from '@/__generated__/output'
import { PAYMENT_METHOD_LABEL } from '@/base/payment-methods/payment-methods.base'
import { PRICING_TYPE_LABEL } from '@/base/pricing-types/pricing-types.base'
import { STATUS_LABEL } from '@/base/status/status.base'
import CalendarIcon from '@/components/icons/CalendarIcon'
import CityIcon from '@/components/icons/CityIcon'
import CoinsIcon from '@/components/icons/CoinsIcon'
import HandCoinsIcon from '@/components/icons/HandCoinsIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import UpIcon from '@/components/icons/UpIcon'
import Image from '@/components/ui/common/image/Image'
import type { IRequest } from '@/shared/interfaces/api/request/request.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { formatDate } from '@/utils/formats/date/format-date.util'
import type { FC } from 'react'
import styles from './Request.module.scss'

const Request: FC<IRequest> = ({
	request,
	isSecured,
	onContacts,
	onPromote,
	onEdit,
	onDelete,
	className,
}) => {
	return (
		<li className={formatClassName([styles.request, className])}>
			<div
				className={formatClassName([
					styles.content,
					isSecured ? styles.secured : styles.public,
				])}
			>
				<div className={styles.about}>
					{request.status && (
						<div
							className={formatClassName([
								styles.badge,
								styles[request.status],
							])}
						>
							{STATUS_LABEL[request.status]}
						</div>
					)}
					<div className={styles.category}>
						<div className={styles.icon}>
							<Image
								src={request.category.iconPath}
								alt={request.category.name}
							/>
						</div>
						<div className={styles.box}>
							<div className={styles.name}>{request.category.name}</div>
							<span className={styles.quantity}>{request.quantity} ед.</span>
						</div>
					</div>
				</div>
				<div className={styles.main}>
					<ul className={styles.options}>
						<li className={styles.option}>
							<div className={styles.icon}>
								<HandCoinsIcon />
							</div>
							<div className={styles.box}>
								<span className={styles.label}>Способ оплаты</span>
								<div className={styles.value}>
									{PAYMENT_METHOD_LABEL[request.paymentMethod]}
								</div>
							</div>
						</li>
						<li className={styles.option}>
							<div className={styles.icon}>
								<CalendarIcon />
							</div>
							<div className={styles.box}>
								<span className={styles.label}>Дата начала работ</span>
								<div className={styles.value}>{request.startAt}</div>
							</div>
						</li>
						<li className={styles.option}>
							<div className={styles.icon}>
								<CityIcon />
							</div>
							<div className={styles.box}>
								<span className={styles.label}>Место проведения работ</span>
								<div className={styles.value}>{request.region}</div>
							</div>
						</li>
						{isSecured && (
							<li className={styles.option}>
								<div className={styles.icon}>
									<CoinsIcon />
								</div>
								<div className={styles.box}>
									<span className={styles.label}>Расценка</span>
									<div className={styles.value}>
										{request.price !== null
											? `${request.price} ₽`
											: 'Запрос цены'}{' '}
										{PRICING_TYPE_LABEL[request.pricingType]}
									</div>
								</div>
							</li>
						)}
					</ul>
					<p className={styles.description}>{request.description}</p>
				</div>
				{!isSecured && (
					<div className={styles.info}>
						<div className={styles.option}>
							<div className={styles.icon}>
								<CoinsIcon />
							</div>
							<div className={styles.box}>
								<span className={styles.label}>Расценка</span>
								<div className={styles.value}>
									{request.price !== null
										? `${request.price} ₽`
										: 'Запрос цены'}{' '}
									{PRICING_TYPE_LABEL[request.pricingType]}
								</div>
							</div>
						</div>
						<div className={styles.terms}>
							<div className={styles.term}>
								{formatDate(request.createdAt, 'short')}
							</div>
							<div className={styles.term}>№{request.id}</div>
						</div>
						<button className={styles.contacts} onClick={onContacts}>
							<PhoneIcon />
							<span>Посмотреть контакты</span>
						</button>
					</div>
				)}
			</div>
			{isSecured && request.status !== Status.UnderReview && (
				<div className={styles.actions}>
					{request.status !== Status.Canceled && (
						<>
							{request.promotionExpiredAt ? (
								<div
									className={formatClassName([styles.promote, styles.active])}
								>
									<UpIcon />
									<span>Поднят</span>
								</div>
							) : (
								<button className={styles.promote} onClick={onPromote}>
									<UpIcon />
									<span>Поднять заказ</span>
								</button>
							)}

							<button className={styles.edit} onClick={onEdit}>
								<SettingsIcon />
								<span>Изменить заказ</span>
							</button>
						</>
					)}
					<button className={styles.delete} onClick={onDelete}>
						<TrashIcon />
						<span>Удалить заказ</span>
					</button>
				</div>
			)}
		</li>
	)
}

export default Request
