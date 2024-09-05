'use client';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { FormEvent, useState } from 'react';

import Button from '~/core/ui/Button';
import SubHeading from '~/core/ui/SubHeading';
import TextField from '~/core/ui/TextField';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/core/ui/Dialog"

const WaitlistForm: React.FCC<{
  desc: string; button: string;
}> = ({ desc, button }) => {
  // const action = `https://app.convertkit.com/forms/${desc}/subscriptions`;
  const [emailsub, setemailsub] = useState(false)
  const [submitting, setsubmitting] = useState(false)
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setsubmitting(true)
    let formdata = new FormData(e.currentTarget)
    // console.log("---named---", )
    e.preventDefault()
    if (e.currentTarget.elements.namedItem("email_address")) {
      const email_save = await fetch("/api/create-contact", {
        method: "POST",
        body: JSON.stringify({ email: formdata.get("email_address") })
      })
      // console.log("---named---", email_save)
      if (email_save.ok) {
        setemailsub(true)
      }
    }
    setsubmitting(false)
  }
  return (
    <div className=" space-y-8">
      <SubHeading className=" text-center text-xl lg:text-xl text-white dark:text-white">
        {desc}
      </SubHeading>
      <form
        // action={action}
        // method={'POST'}
        // target="_blank"
        onSubmit={handleSubmit}
        className={`flex w-full flex-col justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-1.5 items-center`}
      >
        <TextField.Input
          type="email"
          className="max-w-96"
          name="email_address"
          aria-label="Your email address"
          placeholder="your@email.com"
          required disabled={submitting}
        />

        <Button
          className={
            'bg-violet bg-gradient-to-r shadow-2xl whitespace-nowrap w-full max-w-96 lg:w-auto' +
            ' hover:shadow-primary/60 from-[#AC1471]' +
            ' to-violet-900 hover:to-indigo-600 text-white'
          }
          variant={'custom'}
          round loading={submitting}
        >
          <span className={'flex items-center space-x-2'}>
            <span>
              {button}
            </span>
            <ChevronRightIcon
              className={
                'h-4 animate-in fade-in slide-in-from-left-8' +
                ' delay-1000 fill-mode-both duration-1000 zoom-in'
              }
            />
          </span>
        </Button>
      </form>
      <Dialog open={emailsub} onOpenChange={setemailsub}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thank You. You are Awesome!</DialogTitle>
            <DialogDescription className="!text-white">
              Thank you for signing up. We’ll get back to you with updates soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaitlistForm;
