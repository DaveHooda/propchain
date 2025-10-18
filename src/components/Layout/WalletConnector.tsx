import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Wallet } from 'lucide-react';
import { DiscoverWalletProviders } from './WalletProviders';
import { useState } from 'react';

interface WalletConnector {
	onConnectWallet: () => void;
	walletConnected: boolean;
}

export default function WalletConnector({
	onConnectWallet,
	walletConnected,
}: WalletConnector) {
	const [selectedWallet, setSelectedWallet] =
		useState<EIP6963ProviderDetail>();
	console.log('Selected Wallet:', selectedWallet);
	return (
		<Dialog>
			<DialogTrigger>
				<button
					onClick={onConnectWallet}
					className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
						walletConnected
							? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
							: 'bg-linear-to-r from-blue-600 to-emerald-500 text-white hover:from-blue-700 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105'
					}`}
				>
					<Wallet className='w-4 h-4' />
					<span className='hidden sm:block'>
						{walletConnected
							? 'Wallet Connected'
							: 'Connect Wallet'}
					</span>
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Choose a Wallet to Connect To</DialogTitle>
					<DialogDescription className='mt-4 flex flex-col space-y-4'>
						<DiscoverWalletProviders />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
