import React, { useState } from 'react';
import { CircleUserRoundIcon } from 'lucide-react';
import Auth from './Auth';
import { supabase } from '@/lib/supabase';

const Header = () => {

    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false)

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-primary">My Tasks</h1>
            <div className='flex items-center gap-2'>
                <CircleUserRoundIcon
                    onClick={() => setAuthModalOpen(!authModalOpen)}
                    className='cursor-pointer'
                />
                Statistics
                {/* total tasks */}
                {/* high priority tasks */}
                {/* faviorite tasks */}
            </div>
            {/* auth modal */}
            <Auth
                authModalOpen={authModalOpen}
                setAuthModalOpen={setAuthModalOpen}
            />
        </div>
    )
}

export default Header