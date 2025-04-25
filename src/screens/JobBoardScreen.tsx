// JobBoardScreen.tsx (nâng cấp: xem chi tiết + ứng tuyển)
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import axios from '../services/axiosInstance';
import PaperView from '../theme/components/PaperView';
import PrimaryButton from '../theme/components/PrimaryButton';
import COLORS from '../theme/colors';

export default function JobBoardScreen() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ gioi: '', chau: '', thanh: '' });
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/jobs', { params: filters });
      setJobs(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách job:', err);
    }
  };

  const handleAcceptJob = async () => {
    if (!selectedJob?._id) return;
    try {
      await axios.post('/jobs/accept', { jobId: selectedJob._id, userId: 'USER_ID' }); // Thay bằng user thực tế
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error('Lỗi khi nhận nhiệm vụ:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>📋 Bảng việc làm</Text>

      {/* Bộ lọc theo khu vực */}
      <View style={{ marginBottom: 16 }}>
        <TextInput
          placeholder="Giới"
          value={filters.gioi}
          onChangeText={(text) => setFilters({ ...filters, gioi: text })}
          style={{ borderBottomWidth: 1, marginBottom: 8 }}
        />
        <TextInput
          placeholder="Châu"
          value={filters.chau}
          onChangeText={(text) => setFilters({ ...filters, chau: text })}
          style={{ borderBottomWidth: 1, marginBottom: 8 }}
        />
        <TextInput
          placeholder="Thành"
          value={filters.thanh}
          onChangeText={(text) => setFilters({ ...filters, thanh: text })}
          style={{ borderBottomWidth: 1 }}
        />
      </View>

      {jobs.map((job, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedJob(job)}
          style={{ marginBottom: 12, padding: 12, backgroundColor: '#f4f4f4', borderRadius: 8 }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{job.title}</Text>
          <Text numberOfLines={2}>{job.description}</Text>
          <Text style={{ fontSize: 13, color: '#555' }}>
            Phần thưởng: 💰 {job.reward.coins} xu
            {job.reward.item ? ` 🎁 ${job.reward.item}` : ''}
          </Text>
          <Text style={{ fontSize: 13, color: '#999' }}>
            Địa điểm: {job.location?.gioi || '-'} – {job.location?.chau || '-'} – {job.location?.thanh || '-'}
          </Text>
        </TouchableOpacity>
      ))}

      <Modal visible={!!selectedJob} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{selectedJob?.title}</Text>
            <Text style={{ marginBottom: 8 }}>{selectedJob?.description}</Text>
            <Text style={{ fontSize: 13, color: '#555' }}>Phần thưởng: 💰 {selectedJob?.reward?.coins} xu{selectedJob?.reward?.item ? ` 🎁 ${selectedJob?.reward.item}` : ''}</Text>
            <Text style={{ fontSize: 13, color: '#999', marginBottom: 12 }}>
              Địa điểm: {selectedJob?.location?.gioi || '-'} – {selectedJob?.location?.chau || '-'} – {selectedJob?.location?.thanh || '-'}
            </Text>
            {!selectedJob?.assignedTo && (
              <Button title="Nhận nhiệm vụ này" onPress={handleAcceptJob} />
            )}
            <Button title="Đóng" onPress={() => setSelectedJob(null)} color="#888" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
