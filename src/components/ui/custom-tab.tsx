import React, { useState, useTransition, useMemo, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  title: string;
  component: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  handleTabChange?: (tabId: string) => void;
  disabledTabs?: string[];
}

// const CustomTabs: React.FC<TabsProps> = ({
//   tabs,
//   defaultTab,
//   handleTabChange,
//   disabledTabs = [],
// }) => {
//   const initialTabId = useMemo(() => {
//     const found = tabs.find((tab) => tab.id === defaultTab);
//     return found?.id || tabs[0]?.id || '';
//   }, [tabs, defaultTab]);

//   const [activeTab, setActiveTab] = useState<string>(initialTabId);
//   const [isPending, startTransition] = useTransition();

//   const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

//   const isTabDisabled = (tabId: string) => isPending || disabledTabs.includes(tabId);

//   const focusTabAtIndex = (index: number) => {
//     const target = tabRefs.current[index];
//     if (target && !target.disabled) {
//       target.focus();
//     }
//   };

//   const handleTabClick = (tabId: string) => {
//     if (isTabDisabled(tabId)) return;

//     if (handleTabChange) {
//       handleTabChange(tabId);
//       setActiveTab(tabId);
//     } else {
//       startTransition(() => {
//         setActiveTab(tabId);
//       });
//     }
//   };


//   const activeComponent = useMemo(
//     () => tabs.find((tab) => tab.id === activeTab)?.component,
//     [tabs, activeTab]
//   );

//   if (!tabs.length) {
//     return <div className="text-gray-500 p-4">No tabs provided.</div>;
//   }

//   return (
//     <div className="flex flex-col flex-1 min-h-0">
//       {/* Tab Headers */}
//       <div className="flex border-b border-gray-200" role="tablist">
//         {tabs.map(({ id, title }, index) => {
//           const isActive = activeTab === id;
//           const disabled = isTabDisabled(id);

//           return (
//             <button
//               key={id}
//               id={`tab-${id}`}
//               role="tab"
//               aria-selected={isActive}
//               aria-controls={`tabpanel-${id}`}
//               ref={(el) => { tabRefs.current[index] = el; }}
//               className={clsx(
//                 'px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none',
//                 {
//                   'border-black text-black bg-gray-50': isActive,
//                   'border-transparent text-gray-500 hover:text-gray-700': !isActive,
//                   'opacity-50 cursor-not-allowed': disabled,
//                   'cursor-pointer': !disabled,
//                 }
//               )}
//               onClick={() => handleTabClick(id)}
//               disabled={disabled}
//               type="button"
//             >
//               {title}
//             </button>
//           );
//         })}
//       </div>

//       {/* Tab Content */}
//       <div className="flex-1 overflow-y-auto min-h-0">
//         <div
//           id={`tabpanel-${activeTab}`}
//           role="tabpanel"
//           aria-labelledby={`tab-${activeTab}`}
//           className="py-4"
//         >
//           {activeComponent}
//         </div>
//       </div>
//     </div>
//   );
// };

const CustomTabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  handleTabChange,
  disabledTabs = [],
}) => {
  const initialTabId = useMemo(() => {
    const found = tabs.find((tab) => tab.id === defaultTab);
    return found?.id || tabs[0]?.id || '';
  }, [tabs, defaultTab]);

  const isControlled = typeof defaultTab !== 'undefined';
  const [uncontrolledTab, setUncontrolledTab] = useState<string>(initialTabId);
  const activeTab = isControlled ? defaultTab : uncontrolledTab;

  const [isPending, startTransition] = useTransition();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isTabDisabled = (tabId: string) => isPending || disabledTabs.includes(tabId);

  const handleTabClick = (tabId: string) => {
    if (isTabDisabled(tabId)) return;

    if (handleTabChange) handleTabChange(tabId);

    if (!isControlled) {
      startTransition(() => {
        setUncontrolledTab(tabId);
      });
    }
  };

  const activeComponent = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.component,
    [tabs, activeTab]
  );

  if (!tabs.length) return <div className="text-gray-500 p-4">No tabs provided.</div>;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200" role="tablist">
        {tabs.map(({ id, title }, index) => {
          const isActive = activeTab === id;
          const disabled = isTabDisabled(id);

          return (
            <button
              key={id}
              id={`tab-${id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${id}`}
              ref={(el) => { tabRefs.current[index] = el; }}
              className={clsx(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none',
                {
                  'border-black text-black bg-gray-50': isActive,
                  'border-transparent text-gray-500 hover:text-gray-700': !isActive,
                  'opacity-50 cursor-not-allowed': disabled,
                  'cursor-pointer': !disabled,
                }
              )}
              onClick={() => handleTabClick(id)}
              disabled={disabled}
              type="button"
            >
              {title}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="py-4"
        >
          {activeComponent}
        </div>
      </div>
    </div>
  );
};


export default CustomTabs;
