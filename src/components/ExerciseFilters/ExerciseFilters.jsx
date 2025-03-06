import { useCallback } from 'react';

import { Input, Select, Row, Col } from 'antd';

import { TAG_TYPES, COMPLEXITY_TYPES } from '../../constants/exercise.constants';

import styles from './ExerciseFilters.module.css';

export default function ExerciseFilters({ onSearch }) {
    const handleSearch = useCallback((e) => {
        const searchValue = e.target.value.toLowerCase();
        onSearch({ search: searchValue });
    }, [onSearch]);

    const handleComplexityChange = useCallback((value) => {
        onSearch({ complexity: value });
    }, [onSearch]);

    const handleTagChange = useCallback((value) => {
        onSearch({ tag: value });
    }, [onSearch]);

    return (
        <Col xs={24} md={15}>
            <div className={styles.filterContainer}>
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Input 
                            className={styles.searchInput}
                            placeholder="Поиск упражнения" 
                            onChange={handleSearch}
                            allowClear
                        />
                    </Col>
                    <Col xs={12} sm={12}>
                        <Select
                            className={styles.filterSelect}
                            placeholder="Сложность"
                            allowClear
                            onChange={handleComplexityChange}
                        >
                            {COMPLEXITY_TYPES.map(complexity => (
                                <Select.Option key={complexity} value={complexity}>
                                    {complexity}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={12} sm={12}>
                        <Select
                            className={styles.filterSelect}
                            placeholder="Категория"
                            allowClear
                            onChange={handleTagChange}
                        >
                            {TAG_TYPES.map(tag => (
                                <Select.Option key={tag} value={tag}>
                                    {tag}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}