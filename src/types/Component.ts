import { ComponentType, LazyExoticComponent } from 'react';

export type Component<T = any> = ComponentType<T> | LazyExoticComponent<ComponentType<T>>;
