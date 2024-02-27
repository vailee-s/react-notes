'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation'

export default function SidebarNoteContent({
	id,
	title,
	children,
	expandedChildren,
}) {
	const router = useRouter()
	const pathname = usePathname()
	const selectedId = pathname.split('/')[1] || null
	// useTransition作用是在切换路由时，等待页面加载完成后再切换
	const [isPending] = useTransition({timeoutMs: 1000})
	const [isExpanded, setIsExpanded] = useState(false);
	const isActive = id === selectedId
	const itemRef = useRef(null);
	const prevTitleRef = useRef(title);
	
	useEffect(() => {
		if (title !== prevTitleRef.current) {
			prevTitleRef.current = title
			itemRef.current.classList.add('flash')
		}
	}, [title])
	return (
		<div
			ref={itemRef}
			onAnimationEnd={() => itemRef.current.classList.remove('flash')}
			className={[
				'sidebar-note-list-item',
				isExpanded ? 'note-expanded' : '',
			].join(' ')}>
			{children}
			<button
				className="sidebar-note-open"
				style={{
					backgroundColor: isPending
						? 'var(--gray-80)'
						: isActive
							? 'var(--tertiary-blue)'
							: '',
					border: isActive
						? '1px solid var(--primary-border)'
						: '1px solid transparent',
				}}
				onClick={() => {
					const sidebarToggle = document.getElementById('sidebar-toggle')
					if (sidebarToggle) {
						sidebarToggle.checked = true
					}
					router.push(`/note/${id}`)
				}}>
				Open note for preview
			</button>
			<button
				className="sidebar-note-toggle-expand"
				onClick={(e) => {
					e.stopPropagation();
					setIsExpanded(!isExpanded);
				}}>
				{isExpanded ? (
					<img
						src="/chevron-down.svg"
						width="10px"
						height="10px"
						alt="Collapse"
					/>
				) : (
					<img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
				)}
			</button>
			{isExpanded && expandedChildren}
		</div>
	
	);
}
