import React from 'react'
import ProjectHeader from './_shared/ProjectHeader'
import SettingSection from './_shared/SettingSection';

function ProjectCanvasPlayground() {
  return (
    <div>
      <ProjectHeader></ProjectHeader>
      <div>
        {/* Settings */}
        <SettingSection></SettingSection>
        {/* Canvas */}
      </div>
    </div>
  )
}

export default ProjectCanvasPlayground;
