import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CircleUserRoundIcon } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import Loader from '../Loader'

export const LogoutModal = ({ user }: { user: User | null }) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
        if (error) {
            toast.error("Failed to logout. Please try again.");
            return;
        }
        toast.success("You have been logged out successfully!");
        router.push("/auth"); // redirect to login page
    };

    return (
        <Dialog>
            <DialogTrigger>
                <CircleUserRoundIcon className='cursor-pointer text-secondaryText opacity-80' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>
                        You are currently logged in as <strong>{user?.email}</strong>. Logging out will end your session.
                        You will need to login again to access your tasks and data.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleLogout} disabled={loading}>
                        {!loading
                            ? "Confirm"
                            : <div className="flex items-center gap-1">Logging out <Loader /></div>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
