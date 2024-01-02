import { Auth } from 'neurelo-sdk';
import { Tooltip } from '../ui/tooltip';
import { AccountListCard } from './account-list-card';

const CLICK_HERE_TEXT = 'Click here to open details page.';

export async function AccountList({ data }: { data: Auth[] }) {
  return data !== undefined && data?.length > 0
    ? data.map((account) => (
        <Tooltip
          key={account.user_id}
          content={CLICK_HERE_TEXT}
          delayDuration={0}
          showArrow
        >
          <AccountListCard account={account} />
        </Tooltip>
      ))
    : null;
}
