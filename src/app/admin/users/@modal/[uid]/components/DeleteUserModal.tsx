'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { User } from '@supabase/gotrue-js';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import { deleteUserAction } from '~/app/admin/users/@modal/[uid]/actions.server';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import Trans from '~/core/ui/Trans';

function DeleteUserModal({
  user,
}: React.PropsWithChildren<{
  user: User;
}>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const csrfToken = useCsrfToken();
  const displayText = user.email ?? user.phone ?? '';

  const onDismiss = () => {
    router.back();

    setIsOpen(false);
  };

  const onConfirm = () => {
    startTransition(async () => {
      await deleteUserAction({
        userId: user.id,
        csrfToken,
      });

      onDismiss();
    });
  };

  return (
    <Modal heading={'Deleting User'} isOpen={isOpen} setIsOpen={onDismiss}>
      <form action={onConfirm}>
        <div className={'flex flex-col space-y-4'}>
          <div className={'flex flex-col space-y-2 text-sm'}>
            <p>
              <Trans
                i18nKey={'admin:userDeleteConfirm'}
                values={{ user: displayText }}
                components={{ b: <b /> }}
              />
            </p>

            <p>
              <Trans i18nKey={'admin:deleteUserDataWarning'} />
            </p>

            <p>
              <b><Trans i18nKey={'admin:actionNotReversible'} /></b>.
            </p>

            <p>
              <Trans i18nKey={'admin:reallyWantThis'} />
            </p>
          </div>

          <div>
            <TextFieldLabel>
              <Trans
                i18nKey={'admin:confirmByTyping'}
                values={{ delete: "DELETE" }}
                components={{ b: <b /> }}
              />

              <TextFieldInput required type={'text'} pattern={'DELETE'} />
            </TextFieldLabel>
          </div>

          <div className={'flex space-x-2.5 justify-end'}>
            <Modal.CancelButton disabled={pending} onClick={onDismiss}>
              <Trans i18nKey={'admin:cancel'} />
            </Modal.CancelButton>

            <Button loading={pending} variant={'destructive'}>
              <Trans i18nKey={'admin:deleteUserOkay'} />
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default DeleteUserModal;
