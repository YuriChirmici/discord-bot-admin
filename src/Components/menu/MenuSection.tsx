import { ListItem, ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuSubsection } from './MenuSubsection';
import { ISection } from '../../hooks/useMenu';

interface Props {
	section: ISection;
	isActive: boolean;
	isExpanded: boolean;
	isSubsectionActive: (path: string) => boolean;
	onSectionClick: () => void;
}

export const MenuSection: React.FC<Props> = ({
	section,
	isActive,
	isExpanded,
	isSubsectionActive,
	onSectionClick
}) => {
	const showSubsections = section.subsections && section.subsections.length > 1;

	return (
		<div>
			<ListItem disablePadding>
				<ListItemButton
					component={section.subsections ? 'div' : Link}
					to={!section.subsections ? section.path : undefined}
					selected={isActive}
					onClick={onSectionClick}
					sx={{
						backgroundColor: isActive ? 'rgba(0, 123, 255, 0.2)' : 'transparent',
					}}
				>
					<ListItemText primary={section.text} />
				</ListItemButton>
			</ListItem>
			{showSubsections && (
				<Collapse in={isExpanded} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{section.subsections!.map((subsection) => (
							<MenuSubsection
								key={subsection.text}
								text={subsection.text}
								path={subsection.path}
								isActive={isSubsectionActive(subsection.path)}
							/>
						))}
					</List>
				</Collapse>
			)}
		</div>
	);
};
