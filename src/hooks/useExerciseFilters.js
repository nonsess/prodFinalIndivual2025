import { useState, useMemo } from 'react';

export function useExerciseFilters(exercises) {
  const [filters, setFilters] = useState({
    search: '',
    complexity: '',
    tag: ''
  });

  const handleSearch = (newFilter) => {
    setFilters(prev => ({...prev, ...newFilter}));
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesComplexity = !filters.complexity || exercise.complexity === filters.complexity;
      const matchesTag = !filters.tag || exercise.tag === filters.tag;
      
      return matchesSearch && matchesComplexity && matchesTag;
    });
  }, [exercises, filters]);

  return { filters, handleSearch, filteredExercises };
} 