

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TableComponent from '@/components/TableComponent';
import VideoLinkDialog from './VideoLinkDialog';
interface VideoLinkType {
  id: number;
  type: string;
  description: string;
  link: string;
}

function VideoLink() {


  const { link } = useAppSelector((state) => state.video);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [localVideo, setLocalVideo] = useState(link);



 

  const videoLinks: VideoLinkType[] = Array.isArray(link) ? link : [];
  const uniqueTypes = Array.from(
    new Set(videoLinks.map((item) => item.type))
  ).filter(Boolean);

  const columns = [
    {
      header: 'Type',
      accessorKey: 'type',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Link',
      accessorKey: 'link',
    },
    {
      header: 'Actions',
      accessorKey: 'action',
    },
  ]
  const data = [
    {
      type: 'Type 1',
      description: 'Description 1',
      link: 'https://www.google.com',
    },
    {
      type: 'Type 2',
      description: 'Description 2',
      link: 'https://www.google.com',
    },
    {
      type: 'Type 3',
      description: 'Description 3',
      link: 'https://www.google.com',
    },
  ]
  const action = [
    {
      header: 'Edit',
      accessorKey: 'edit',
      icon: <Edit />,
      onClick: () => {
        console.log('Edit');
      },
    },
    {
      header: 'Delete',
      accessorKey: 'delete',
      icon: <Trash />,
      onClick: () => {
        console.log('Delete');
      },
    },
  ]




  return (
    <div className=''>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold'>Add New Video Link</h2>
        <div className='flex items-center gap-4'>
          <Select
            value={selectedType}
            onValueChange={(value: string) => setSelectedType(value)}
          >
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>

            <SelectContent className='max-h-40 overflow-y-auto'>
              <SelectItem value='all'>All Types</SelectItem>
              {uniqueTypes.map((type) => (
                <SelectItem key={type} value={type || 'default'}>
                  {type || 'Default'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className=' text-white' onClick={() => setOpen(true)}>
            <Plus className='mr-2 h-4 w-4' /> Add New Video Links
          </Button>
        </div>
      </div>
      <div className='relative rounded-lg border bg-white overflow-x-auto'>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TYPE</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead>LINK</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videoLinks.length > 0 ? (
              videoLinks
                .filter(
                  (video) =>
                    selectedType === 'all' || video.type === selectedType
                )
                .map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className='font-medium'>{video.type}</TableCell>
                    <TableCell>{video.description}</TableCell>
                    <TableCell className='text-blue-600 hover:underline'>
                      <a
                        href={video.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`Open video link for ${video.description}`}
                      >
                        {video.link}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button variant='ghost' size='icon'>
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleDelete(video.id)}
                        >
                          <Trash className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  No videos available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> */}
        <TableComponent columns={columns} data={data}  />
        
      </div>
          <VideoLinkDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default VideoLink;
