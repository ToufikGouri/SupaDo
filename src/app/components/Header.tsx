import React, { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { LogoutModal } from './Tasks/LogoutModal';
import { supabase } from '@/lib/supabase';

const Header = () => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-primary">My Tasks</h1>
            <div className='flex items-center gap-2'>
                <LogoutModal user={user} />
                Statistics
                {/* total tasks */}
                {/* high priority tasks */}
                {/* faviorite tasks */}
            </div>
        </div>
    )
}

export default Header