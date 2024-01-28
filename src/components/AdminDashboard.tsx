'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Button from './Button';

interface AdminDashboardProps {
  user: User;
}

const supabase = createClient();

const AdminDashboard: FC<AdminDashboardProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-8">
        <b>{user.email}</b>님으로 로그인하셨습니다.
      </div>
      <Button type="button" onClick={() => router.push('/write')}>
        글 쓰러 가기
      </Button>
      <Button
        type="button"
        onClick={() => {
          fetch('/api/posts', {
            method: 'DELETE',
          });
        }}
      >
        테스트 글 삭제
      </Button>
      <Button
        type="button"
        onClick={() => {
          supabase.auth.signOut();
          router.push('/');
        }}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default AdminDashboard;
