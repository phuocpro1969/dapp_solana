import {
	AccountLayout,
	MintLayout,
	Token,
	TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WRAPPED_SOL_MINT } from "../utils/ids";

import {
	Account,
	PublicKey,
	SystemProgram,
	TransactionInstruction,
} from "@solana/web3.js";

export function ensureSplAccount(
	instructions,
	cleanupInstructions,
	toCheck,
	payer,
	amount,
	signers
) {
	if (!toCheck.info.isNative) {
		return toCheck.pubKey;
	}

	const account = createUninitializedAccount(
		instructions,
		payer,
		amount,
		signers
	);

	instructions.push(
		Token.createInitAccountInstruction(
			TOKEN_PROGRAM_ID,
			WRAPPED_SOL_MINT,
			account,
			payer
		)
	);

	cleanupInstructions.push(
		Token.createCloseAccountInstruction(
			TOKEN_PROGRAM_ID,
			account,
			payer,
			payer,
			[]
		)
	);

	return account;
}

function createUninitializedAccount(instructions, payer, amount, signers) {
	const account = new Account();
	instructions.push(
		SystemProgram.createAccount({
			fromPubkey: payer,
			newAccount: account.publicKey,
			lamports: amount,
			space: AccountLayout.span,
			programId: TOKEN_PROGRAM_ID,
		})
	);

	signers.push(account);

	return account.publicKey;
}
