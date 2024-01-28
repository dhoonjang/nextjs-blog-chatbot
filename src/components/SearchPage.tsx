'use client';

import IconButton from '@/components/IconButton';
import Message, { MessageProps } from '@/components/Message';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { ChatCompletionMessageParam } from 'openai/resources/index';
import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from './Button';
import { PostCardProps } from './PostCard';

const SearchPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >(() => {
    if (typeof window === 'undefined') return [];
    const existingMessages = localStorage.getItem('messages');
    if (!existingMessages) return [];
    return JSON.parse(existingMessages);
  });

  const { mutate, isPending } = useMutation<
    ChatCompletionMessageParam[],
    unknown,
    ChatCompletionMessageParam[]
  >({
    mutationFn: async (messages) => {
      const res = await axios.post('/api/completions', {
        messages,
      });

      return res.data.messages;
    },
    onSuccess: (data) => {
      setMessageParams(data);
      localStorage.setItem('messages', JSON.stringify(data));
    },
  });

  const handleReset = useCallback(() => {
    if (window.confirm('대화를 초기화 하시겠습니까?') === false) return;
    setMessageParams([]);
    localStorage.removeItem('messages');
  }, []);

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (isPending || !inputRef.current) return;
      const nextMessages = [
        ...messageParams,
        {
          content: inputRef.current.value as string,
          role: 'user' as const,
        },
      ];

      setMessageParams(nextMessages);
      mutate(nextMessages);

      inputRef.current.value = '';
    },
    [isPending, messageParams, mutate],
  );

  const messagePropsList = useMemo(() => {
    let posts: Omit<PostCardProps, 'className'>[] = [];

    const result = messageParams.reduce<MessageProps[]>((acc, cur) => {
      if (cur.role === 'function' && cur.content) {
        posts.push(JSON.parse(cur.content) as Omit<PostCardProps, 'className'>);
      }

      if (cur.role === 'user') {
        posts = [];
        return [...acc, cur as MessageProps];
      }

      if (cur.role === 'assistant') {
        const newResult = [
          ...acc,
          {
            ...cur,
            posts: [...posts],
          } as MessageProps,
        ];
        posts = [];
        return newResult;
      }

      return acc;
    }, []);

    return result;
  }, [messageParams]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <Message content="무엇이든 물어보세요!" role="assistant" />
        {messagePropsList.map((props, index) => (
          <Message {...props} key={index} />
        ))}
        {isPending && <Message content="생각중..." role="assistant" />}
      </div>
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-md border"
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded-md p-2 pl-3"
            placeholder="NextJS가 뭐야?"
          />
          <IconButton
            Icon={AiOutlineSearch}
            label="submitMessage"
            type="submit"
          />
        </form>
        <Button
          className="ml-auto mt-2 block w-[100px]"
          type="button"
          onClick={handleReset}
        >
          대화 초기화
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
