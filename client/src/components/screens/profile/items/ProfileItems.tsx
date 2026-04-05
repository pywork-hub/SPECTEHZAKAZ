import PlusCircleIcon from '@/components/icons/PlusCircleIcon'
import Item from '@/components/parts/item/Item'
import ItemForm from '@/components/templates/forms/item/ItemForm'
import Modal from '@/components/templates/modal/Modal'
import { useManageItem } from '@/hooks/api/item/useManageItem.hook'
import type { IProfileItems } from '@/shared/interfaces/api/profile-item/profile-item.interface'
import type { FC } from 'react'
import styles from './ProfileItems.module.scss'

const ProfileItems: FC<IProfileItems> = ({ items, isItems }) => {
	const {
		attributes,
		categories,
		regions,
		promoteItem,
		deleteItem,
		upsertItem,
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isFormLoading,
		isMutationLoading,
		form,
		closeForm,
	} = useManageItem()

	return (
		<>
			{items.length > 0 && (
				<ul className={styles.list}>
					{items.map((item) => (
						<Item
							key={item.id}
							isSecured
							item={item as any}
							onPromote={() => promoteItem(item.id)}
							onEdit={() => upsertItem(item.id)}
							onDelete={() => deleteItem(item.id)}
						/>
					))}
				</ul>
			)}
			{isItems && (
				<button className={styles.add} onClick={() => upsertItem()}>
					<PlusCircleIcon />
					<span>Добавить спецтехнику</span>
				</button>
			)}
			{form.isShow && !isFormLoading && (
				<Modal
					className={styles.form}
					heading="Оформление объявления"
					close={closeForm}
				>
					<ItemForm
						attributes={attributes}
						categories={categories}
						regions={regions}
						isFormLoading={isFormLoading}
						isMutationLoading={isMutationLoading}
						register={register}
						control={control}
						errors={errors}
						onSubmit={handleSubmit(onSubmit)}
						isUpdate={!!form.id}
					/>
				</Modal>
			)}
		</>
	)
}

export default ProfileItems
