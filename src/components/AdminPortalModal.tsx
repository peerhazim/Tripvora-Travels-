import React, { useState, useEffect } from 'react';
import { 
  X, Lock, ShieldCheck, Mail, Phone, MessageSquare, Download, RefreshCw, 
  Search, CheckCircle2, Clock, Calendar, Users, MapPin, Trash2, FileSpreadsheet,
  AlertCircle, ChevronDown, Check, LogOut, Sparkles, ExternalLink
} from 'lucide-react';
import { TravelLeadQuery, AdminStats } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  // Authentication state (persisted in session)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem('tripvora_admin_token');
  });
  const [adminEmail, setAdminEmail] = useState('peerhazim98@gmail.com');
  const [adminPassword, setAdminPassword] = useState('tripvora2026');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Queries & dashboard state
  const [queries, setQueries] = useState<TravelLeadQuery[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    new: 0,
    contacted: 0,
    quoted: 0,
    booked: 0,
    emailAlertsTo: 'peerhazim98@gmail.com',
    whatsappHotline: '+91 7006644364'
  });
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'booked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/queries?status=${statusFilter}&search=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setQueries(data.queries || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchQueries();
    }
  }, [isAuthenticated, isOpen, statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('tripvora_admin_token', data.token);
        setIsAuthenticated(true);
        showToast('Welcome Hazim! Admin session authenticated.');
        fetchQueries();
      } else {
        setLoginError(data.error || 'Invalid credentials. Password: tripvora2026');
      }
    } catch (err) {
      setLoginError('Unable to connect to backend server. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tripvora_admin_token');
    setIsAuthenticated(false);
  };

  const updateStatus = async (id: string, newStatus: TravelLeadQuery['status']) => {
    try {
      const res = await fetch(`/api/queries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setQueries(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
        showToast(`Query ${id} marked as ${newStatus.toUpperCase()}`);
        fetchQueries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveAdminNote = async (id: string) => {
    try {
      const res = await fetch(`/api/queries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: noteDraft })
      });
      if (res.ok) {
        setQueries(prev => prev.map(q => q.id === id ? { ...q, adminNotes: noteDraft } : q));
        setEditingNotesId(null);
        showToast('Agent note updated successfully.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuery = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete inquiry ${id}?`)) return;
    try {
      const res = await fetch(`/api/queries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setQueries(prev => prev.filter(q => q.id !== id));
        showToast(`Inquiry ${id} deleted.`);
        fetchQueries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-5xl bg-white border border-emerald-300 text-stone-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border-b border-emerald-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif-display text-lg font-bold text-white tracking-wide">
                  TripVora Travels • Lead &amp; Query Dispatch Hub
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-emerald-100 border border-white/30">
                  {isAuthenticated ? 'Admin Active' : 'Restricted'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">
                All client inquiries automatically routed to <strong className="text-white underline">peerhazim98@gmail.com</strong> &amp; WhatsApp <strong className="text-white underline">7006644364</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                title="Log out of Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast alert banner */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Admin Login Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                TripVora Administrator Portal
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Log in to monitor customer quotes, update booking statuses, view inquiry records dispatched to <strong>peerhazim98@gmail.com</strong>, and manage WhatsApp communications on <strong>7006644364</strong>.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3.5 text-left">
              {loginError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="peerhazim98@gmail.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  placeholder="••••••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Access Admin Portal</span>
              </button>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-[11px] text-stone-600 text-center">
                <span>Default Demo Credentials:</span>{' '}
                <strong className="text-emerald-800">peerhazim98@gmail.com</strong> /{' '}
                <strong className="text-emerald-800">tripvora2026</strong>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-stone-50/50">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-white border border-stone-200 rounded-xl p-3.5 shadow-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">Total Queries</span>
                <div className="text-2xl font-bold font-serif-display text-stone-900 mt-1">{stats.total}</div>
                <span className="text-[10px] text-stone-500">From all landing forms</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 shadow-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">New / Uncontacted</span>
                <div className="text-2xl font-bold font-serif-display text-emerald-700 mt-1">{stats.new}</div>
                <span className="text-[10px] text-emerald-700/80">Requires call/WhatsApp</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 shadow-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">In Discussion / Quoted</span>
                <div className="text-2xl font-bold font-serif-display text-amber-700 mt-1">{stats.quoted + stats.contacted}</div>
                <span className="text-[10px] text-amber-600">Proposal dispatched</span>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 shadow-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-800 block">Confirmed Bookings</span>
                <div className="text-2xl font-bold font-serif-display text-teal-700 mt-1">{stats.booked}</div>
                <span className="text-[10px] text-teal-600">Advance token received</span>
              </div>
            </div>

            {/* Notification Setup Status Pill */}
            <div className="p-3.5 bg-white border border-emerald-300 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <span className="font-bold text-stone-900 block">Email &amp; WhatsApp Notification Pipeline Active</span>
                  <span className="text-stone-600 text-[11px]">
                    Every customer submission is logged, dispatched to <strong className="text-emerald-800">peerhazim98@gmail.com</strong>, and generates direct WhatsApp routing for <strong className="text-emerald-800">7006644364</strong>.
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href="/api/queries/export/csv"
                  download="tripvora_leads.csv"
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-stone-200"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export CSV</span>
                </a>
                <button
                  onClick={fetchQueries}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Filters and Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-stone-200 shadow-xs">
                {(['all', 'new', 'contacted', 'quoted', 'booked'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name, phone, sector..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchQueries()}
                  className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600 shadow-xs"
                />
              </div>
            </div>

            {/* Queries List */}
            {queries.length === 0 ? (
              <div className="p-12 text-center text-stone-500 bg-white rounded-xl border border-stone-200 space-y-2 shadow-xs">
                <Calendar className="w-8 h-8 mx-auto text-stone-400" />
                <div className="text-sm font-semibold text-stone-800">No traveler inquiries found</div>
                <div className="text-xs text-stone-500">Try clearing your filters or submit a test lead through the Hero or Contact form.</div>
              </div>
            ) : (
              <div className="space-y-4">
                {queries.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white border border-stone-200 hover:border-emerald-500 rounded-xl p-4 sm:p-5 transition-all shadow-xs space-y-3.5"
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {q.id}
                          </span>
                          <span className="text-xs text-stone-500">
                            {new Date(q.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-700">
                            Source: {q.source.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="font-serif-display text-lg font-bold text-stone-900 mt-1">
                          {q.name}
                        </h4>
                      </div>

                      {/* Status Dropdown & Delete */}
                      <div className="flex items-center space-x-2">
                        <select
                          value={q.status}
                          onChange={(e) => updateStatus(q.id, e.target.value as TravelLeadQuery['status'])}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                            q.status === 'new'
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                              : q.status === 'booked'
                              ? 'bg-teal-50 border-teal-400 text-teal-900'
                              : q.status === 'quoted'
                              ? 'bg-amber-50 border-amber-400 text-amber-900'
                              : 'bg-stone-50 border-stone-300 text-stone-700'
                          }`}
                        >
                          <option value="new">● New Lead</option>
                          <option value="contacted">● Contacted</option>
                          <option value="quoted">● Itinerary Quoted</option>
                          <option value="booked">● Confirmed Booking</option>
                          <option value="archived">● Archived</option>
                        </select>
                        <button
                          onClick={() => deleteQuery(q.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-stone-100 transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Inquiry Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-stone-500 uppercase font-semibold text-[10px] block">Customer Contact</span>
                        <div className="text-stone-900 font-bold mt-0.5">📞 {q.phone}</div>
                        {q.email && <div className="text-stone-600 mt-0.5 truncate">✉️ {q.email}</div>}
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase font-semibold text-[10px] block">Destination / Circuit</span>
                        <div className="text-stone-900 font-medium mt-0.5 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{q.destination}</span>
                        </div>
                        <div className="text-stone-600 mt-0.5">Duration: {q.duration || 'Flexible'}</div>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase font-semibold text-[10px] block">Travel Group &amp; Dates</span>
                        <div className="text-stone-900 font-medium mt-0.5 flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{q.travelers || `${q.adults || 2} Adults`}</span>
                        </div>
                        <div className="text-stone-600 mt-0.5">Dates: {q.travelDate || 'Any Season'}</div>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase font-semibold text-[10px] block">Vehicle &amp; Lodging</span>
                        <div className="text-stone-900 font-medium mt-0.5">{q.cabType || 'Sedan / Innova'}</div>
                        <div className="text-stone-600 mt-0.5">{q.hotelCategory || 'Deluxe'}</div>
                      </div>
                    </div>

                    {/* Customer Notes */}
                    {q.notes && (
                      <div className="p-2.5 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-stone-800">
                        <strong className="text-emerald-800">Client Requirement:</strong> {q.notes}
                      </div>
                    )}

                    {/* Action Bar with direct WhatsApp & Call */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* WhatsApp Customer */}
                        <a
                          href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${q.name}, this is Hazim from TripVora Travels Srinagar. Thank you for your inquiry about ${q.destination}!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>

                        {/* Call Customer */}
                        <a
                          href={`tel:${q.phone}`}
                          className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Call {q.phone}</span>
                        </a>

                        {/* Email Customer */}
                        {q.email && (
                          <a
                            href={`mailto:${q.email}?subject=${encodeURIComponent(`TripVora Travels - Customized Itinerary for ${q.destination}`)}`}
                            className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
                          >
                            <Mail className="w-3.5 h-3.5 text-stone-500" />
                            <span>Send Itinerary Email</span>
                          </a>
                        )}
                      </div>

                      {/* Agent Notes */}
                      <div className="flex items-center space-x-2">
                        {editingNotesId === q.id ? (
                          <div className="flex items-center space-x-1.5">
                            <input
                              type="text"
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              placeholder="Add follow-up notes..."
                              className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs text-stone-900 focus:outline-none focus:border-emerald-600"
                            />
                            <button
                              onClick={() => saveAdminNote(q.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-xs cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="text-stone-400 hover:text-stone-600 px-1 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingNotesId(q.id);
                              setNoteDraft(q.adminNotes || '');
                            }}
                            className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold underline cursor-pointer"
                          >
                            {q.adminNotes ? `Note: "${q.adminNotes}"` : '+ Add Agent Note'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
