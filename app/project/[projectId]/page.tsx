"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader2 as Loader2Icon } from 'lucide-react'
import ProjectHeader from './_shared/ProjectHeader'
import SettingSection from './_shared/SettingSection';
import { useParams } from 'next/navigation';
import { ProjectType, ScreenConfig } from '@/type/types'; // Adjust the import path based on where your type is defined

function ProjectCanvasPlayground() {

  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>();
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('Loading');

  useEffect(()=>{
    projectId && GetProjectDetail();
  }, [projectId]);

  const GetProjectDetail = async ()=>{
    setLoading(true);
    setLoadingMsg('Loading...')
    const result = await axios.get('/api/project?projectId='+projectId);
    console.log(result.data);
    setProjectDetail(result?.data?.projectDetail);
    setScreenConfig(result?.data?.screenConfig);
    // if(result.data?.screenConfig?.length==0){
    //   generateScreenConfig()
    // }
    setLoading(false);
  }

  useEffect(() => {
    if (projectDetail && screenConfig && screenConfig?.length == 0){
      generateScreenConfig();
    }
  },[projectDetail&&screenConfig]);

  const generateScreenConfig= async ()=>{
    setLoading(true);
    setLoadingMsg('Generating Screen Config...');
    const result = await axios.post('/api/generate-config', {
      projectId: projectId,
      deviceType: projectDetail?.device,
      userInput: projectDetail?.userInput
    })

    console.log(result.data);
    GetProjectDetail();
    setLoading(false);
  }
  
  return (
    <div>
      <ProjectHeader></ProjectHeader>
      <div>
        {loading && <div className='p-3 absolute left-1/2 top-20 bg-blue-300/20 border-blue-400 border rounded-xl'>
          <h2 className='flex gap-2 items-center '><Loader2Icon className='animate-spin'></Loader2Icon> {loadingMsg}</h2>
        </div>}
        {/* Settings */}
        <SettingSection projectDetail={projectDetail}></SettingSection>
        {/* Canvas */}
      </div>
    </div>
  )
}

export default ProjectCanvasPlayground;
