import { Entity, Column, PrimaryColumn } from 'typeorm';

interface InfoType {
	col1: string;
	col2: string;
	col3: string;
}

@Entity()
export class IndexPageDatas {
	@PrimaryColumn()
	langCode: string;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column('jsonb')
	info: InfoType;
}
