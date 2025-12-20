import { Drawer, List, Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MenuSection } from './MenuSection';
import { ISection } from '../../hooks/useMenu';

const drawerWidth = 240;

interface Props {
	sections: ISection[];
}

export const Menu: React.FC<Props> = ({ sections }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [ expandedSections, setExpandedSections ] = useState<string[]>([]);

	const isActive = (path: string) => location.pathname === path;
	const isExpanded = (path: string) => expandedSections.includes(path);

	const isSectionActive = (section: ISection) => {
		if (section.subsections && section.subsections.length === 1) {
			return isActive(section.path) || section.subsections.some(sub => isActive(sub.path));
		}
		return isActive(section.path);
	};

	useEffect(() => {
		const currentPath = location.pathname;
		const sectionToExpand = sections.find(section =>
			section.subsections &&
			section.subsections.length > 1 &&
			section.subsections.some(sub => sub.path === currentPath)
		);

		if (sectionToExpand) {
			setExpandedSections([ sectionToExpand.path ]);
		}
	}, [ location.pathname, sections ]);

	const handleSectionClick = (section: ISection) => {
		if (!section.subsections?.length) {
			setExpandedSections([]);
			return;
		}

		if (section.subsections.some(sub => isActive(sub.path))) {
			// Ignore clicks on already active section
			return;
		}

		const expandedSections = [];
		if (section.subsections.length > 1) {
			expandedSections.push(section.path);
		}

		setExpandedSections(expandedSections);
		navigate(section.subsections[0].path);
	};

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
			}}
		>
			<Toolbar />
			<List>
				{sections.map((section) => (
					<MenuSection
						key={section.text}
						section={section}
						isActive={isSectionActive(section)}
						isExpanded={isExpanded(section.path)}
						isSubsectionActive={isActive}
						onSectionClick={() => handleSectionClick(section)}
					/>
				))}
			</List>
		</Drawer>
	);
};
