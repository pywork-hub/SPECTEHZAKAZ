import Loader from '@/components/ui/common/loader/Loader'
import { useLogout } from '@/hooks/api/auth/useLogout.hook'
import type { ILogout } from '@/shared/interfaces/components/logout/logout.interface'
import type { FC } from 'react'

const Logout: FC<ILogout> = ({ setUser, children, className }) => {
	const { logout, isLoading } = useLogout({ setUser })

	return (
		<>
			{isLoading ? (
				<div className={className}>
					<Loader />
				</div>
			) : (
				<button className={className} onClick={logout} title={'Выход'}>
					{children}
				</button>
			)}
		</>
	)
}

export default Logout
