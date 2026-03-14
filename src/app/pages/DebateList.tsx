import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import Header from '../components/Header';
import DebateCard from '../components/DebateCard';
import ContributionModal from '../components/ContributionModal';
import { mockDebates } from '../data/mockData';
import imgBackground from "@/assets/imgBackground.png";
import { t } from '../translations';

export default function DebateList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newDebateModalOpen, setNewDebateModalOpen] = useState(false);

  const filteredDebates = mockDebates.filter(debate => {
    const matchesSearch = debate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debate.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || debate.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f0f3ec] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={imgBackground}
          alt=""
          className="absolute -top-[500%] left-0 w-1/2 h-auto opacity-50"
        />
      </div>

      <Header />

      <main className="relative max-w-[1536px] mx-auto px-12 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-normal text-[#020203] mb-4 tracking-tight">
            {t.debateList.title}
          </h1>
          <p className="text-lg text-[#3e4c5c] max-w-3xl">
            {t.debateList.subtitle}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.debateList.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{t.debateList.filterAll}</option>
                <option value="open">{t.debateList.filterOpen}</option>
                <option value="deliberation">{t.debateList.filterDeliberation}</option>
                <option value="closed">{t.debateList.filterClosed}</option>
              </select>
            </div>

            {/* New Debate Button */}
            <button
              onClick={() => setNewDebateModalOpen(true)}
              className="px-6 py-2 bg-[#c8ff6b] text-[#0c4c27] rounded-lg hover:bg-[#b8ef5b] transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t.debateList.newDebateButton}
            </button>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0B2E34] rounded-lg p-6 text-white">
            <p className="text-3xl font-bold mb-1">{mockDebates.length}</p>
            <p className="text-sm opacity-90">{t.debateList.statsActiveDebates}</p>
          </div>
          <div className="bg-[#0c4c27] rounded-lg p-6 text-white">
            <p className="text-3xl font-bold mb-1">
              {mockDebates.reduce((sum, d) => sum + d.participantCount, 0)}
            </p>
            <p className="text-sm opacity-90">{t.debateList.statsTotalParticipants}</p>
          </div>
          <div className="bg-[#CDFF80] rounded-lg p-6">
            <p className="text-3xl font-bold mb-1 text-[#0B2E34]">
              {mockDebates.reduce((sum, d) => sum + d.contributionCount, 0)}
            </p>
            <p className="text-sm text-[#0c4c27]">{t.debateList.statsTotalContributions}</p>
          </div>
        </div>

        {/* Debates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDebates.map((debate) => (
            <DebateCard key={debate.id} debate={debate} />
          ))}
        </div>

        {/* No Results */}
        {filteredDebates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.debateList.noResultsTitle}</h3>
            <p className="text-gray-600">{t.debateList.noResultsSubtitle}</p>
          </div>
        )}
      </main>

      <ContributionModal
        isOpen={newDebateModalOpen}
        onClose={() => setNewDebateModalOpen(false)}
        mode="new-debate"
      />
    </div>
  );
}
