import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Jobs // table: jobs
    id: number
    created_at: string
    job_title: string
    job_description: string
    job_function: string

*/

// Hooks for Jobs table

export const useJobs = () => useQuery({
    queryKey: ['jobs'],
    queryFn: () => fromSupabase(supabase.from('Jobs').select('*')),
});

export const useAddJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('Jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedJob) => fromSupabase(supabase.from('Jobs').update(updatedJob).eq('id', updatedJob.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useDeleteJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};