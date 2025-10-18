import { useState } from 'react';
import { useSyncProviders } from '@/hooks/useSyncProviders';
import { formatAddress } from '@/utils';
import { Button } from '../ui/button';

export const DiscoverWalletProviders = () => {
	const [selectedWallet, setSelectedWallet] =
		useState<EIP6963ProviderDetail>();
	const [userAccount, setUserAccount] = useState<string>('');
	const providers = useSyncProviders();

	// Connect to the selected provider using eth_requestAccounts.
	const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
		const accounts: string[] | undefined = (await providerWithInfo.provider
			.request({ method: 'eth_requestAccounts' })
			.catch(console.error)) as string[] | undefined;

		if (accounts?.[0]) {
			setSelectedWallet(providerWithInfo);
			setUserAccount(accounts?.[0]);
		}
	};

	// Display detected providers as connect buttons.
	return (
		<>
			<div className='flex flex-col space-y-4'>
				{providers.length > 0 ? (
					providers?.map((provider: EIP6963ProviderDetail) => (
						<Button
							key={provider.info.uuid}
							onClick={() => handleConnect(provider)}
							className='h-fit'
						>
							<img
								src={provider.info.icon}
								alt={provider.info.name}
							/>
							<div>{provider.info.name}</div>
						</Button>
					))
				) : (
					<div>No Announced Wallet Providers</div>
				)}
				{!providers
					.map((p) => {
						console.log(p);
						return p.info.name;
					})
					.includes('MetaMask') && (
					<a
						href='https://metamask.io/download.html'
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-600 underline'
					>
						Install MetaMask
					</a>
				)}
			</div>
			<hr />
			<h2>{userAccount ? '' : 'No '}Wallet Selected</h2>
			{userAccount && (
				<div>
					<div>
						<img
							src={selectedWallet.info.icon}
							alt={selectedWallet.info.name}
						/>
						<div>{selectedWallet.info.name}</div>
						<div>({formatAddress(userAccount)})</div>
					</div>
				</div>
			)}
		</>
	);
};
