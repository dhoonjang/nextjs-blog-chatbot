import { useQuery } from '@tanstack/react-query';
import { getCategories, getTags } from './fetch';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

export const useTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
