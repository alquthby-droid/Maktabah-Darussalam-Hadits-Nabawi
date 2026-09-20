import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  GitBranch, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  ChevronRight, 
  Award, 
  BookOpen, 
  ArrowDown, 
  ArrowRight,
  Maximize2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { HadithItem, RawiProfile } from '../types';
import { buildSanadGraphData, D3SanadGraphNode, D3SanadGraphData } from '../utils/sanadGraphHelper';
import { RAWI_PROFILES } from '../data/jarhData';
import { HADITH_DATABASE } from '../data/hadithData';

interface SanadGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  hadith: HadithItem | null;
  onSelectHadith?: (hadith: HadithItem) => void;
  onOpenRawiDetail?: (rawiId: string) => void;
}

export const SanadGraphModal: React.FC<SanadGraphModalProps> = ({
  isOpen,
  onClose,
  hadith,
  onSelectHadith,
  onOpenRawiDetail,
}) => {
  const [selectedHadithId, setSelectedHadithId] = useState<string>(hadith?.id || 'bukhari-1');
  const [layoutDirection, setLayoutDirection] = useState<'TB' | 'LR'>('TB'); // Top-to-Bottom or Left-to-Right
  const [selectedNode, setSelectedNode] = useState<D3SanadGraphNode | null>(null);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Sync selected hadith if prop changes
  useEffect(() => {
    if (hadith?.id) {
      setSelectedHadithId(hadith.id);
    }
  }, [hadith?.id]);

  const activeHadith = useMemo(() => {
    return HADITH_DATABASE.find(h => h.id === selectedHadithId) || hadith || HADITH_DATABASE[0];
  }, [selectedHadithId, hadith]);

  const graphData: D3SanadGraphData = useMemo(() => {
    return buildSanadGraphData(activeHadith);
  }, [activeHadith]);

  // Set default selected node to the Sahabat or first rawi
  useEffect(() => {
    if (graphData.nodes.length > 1) {
      setSelectedNode(graphData.nodes[1]); // usually the Sahabat
    } else if (graphData.nodes.length > 0) {
      setSelectedNode(graphData.nodes[0]);
    }
  }, [graphData]);

  // Render D3 Sanad Graph
  useEffect(() => {
    if (!isOpen || !svgRef.current || !containerRef.current || graphData.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawing

    const containerWidth = containerRef.current.clientWidth || 800;
    const containerHeight = containerRef.current.clientHeight || 500;

    // Create container group for zoom/pan
    const g = svg.append('g').attr('class', 'sanad-graph-viewport');

    // Setup D3 Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // Defs for gradients & arrow markers
    const defs = svg.append('defs');

    // Arrow marker
    defs.append('marker')
      .attr('id', 'sanad-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('markerWidth', 7)
      .attr('markerHeight', 7)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#d97706'); // amber-600

    defs.append('marker')
      .attr('id', 'sanad-arrow-active')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#10b981'); // emerald-500

    // Compute coordinates for nodes based on direction
    const nodes = graphData.nodes;
    const nodeCount = nodes.length;

    const isTB = layoutDirection === 'TB';
    const nodeWidth = isTB ? 220 : 180;
    const nodeHeight = isTB ? 84 : 90;
    const gap = isTB ? 95 : 120;

    nodes.forEach((n, i) => {
      if (isTB) {
        n.x = containerWidth / 2;
        n.y = 80 + i * (nodeHeight + gap);
      } else {
        n.x = 120 + i * (nodeWidth + gap);
        n.y = containerHeight / 2;
      }
    });

    // Links data
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    const validLinks = graphData.links
      .map(link => ({
        ...link,
        sourceNode: nodeMap.get(link.source),
        targetNode: nodeMap.get(link.target),
      }))
      .filter(l => l.sourceNode && l.targetNode);

    // Render Links (Edges)
    const linkGroup = g.append('g').attr('class', 'links-layer');

    validLinks.forEach((link) => {
      const s = link.sourceNode!;
      const t = link.targetNode!;

      // Draw path line
      let pathD = '';
      if (isTB) {
        const startY = (s.y || 0) + nodeHeight / 2;
        const endY = (t.y || 0) - nodeHeight / 2;
        pathD = `M ${s.x} ${startY} L ${t.x} ${endY}`;
      } else {
        const startX = (s.x || 0) + nodeWidth / 2;
        const endX = (t.x || 0) - nodeWidth / 2;
        pathD = `M ${startX} ${s.y} L ${endX} ${t.y}`;
      }

      linkGroup.append('path')
        .attr('d', pathD)
        .attr('stroke', '#d97706')
        .attr('stroke-width', 2.5)
        .attr('stroke-dasharray', link.ittishalStatus === 'munqathi' ? '5,5' : 'none')
        .attr('fill', 'none')
        .attr('marker-end', 'url(#sanad-arrow)')
        .attr('opacity', 0.85);

      // Shighah Tahammul Badge in the middle of link
      const midX = ((s.x || 0) + (t.x || 0)) / 2;
      const midY = ((s.y || 0) + (t.y || 0)) / 2;

      const badgeGroup = linkGroup.append('g')
        .attr('class', 'shighah-badge')
        .attr('transform', `translate(${midX}, ${midY})`);

      // Pill background
      badgeGroup.append('rect')
        .attr('x', -70)
        .attr('y', -12)
        .attr('width', 140)
        .attr('height', 24)
        .attr('rx', 12)
        .attr('fill', '#1e293b')
        .attr('stroke', '#d97706')
        .attr('stroke-width', 1.2)
        .attr('class', 'shadow-md');

      // Pill text (Shighah Tahammul)
      badgeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', '#fef3c7')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .text(link.shighahTahammul.split('(')[0].trim());
    });

    // Render Nodes
    const nodeGroup = g.append('g').attr('class', 'nodes-layer');

    const nodeG = nodeGroup.selectAll('.sanad-node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'sanad-node cursor-pointer transition-transform')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .on('click', (_, d) => {
        setSelectedNode(d);
      });

    // Node Box Shape
    nodeG.each(function(d) {
      const el = d3.select(this);

      // Color scheme based on status
      let borderColor = '#10b981'; // default emerald
      let bgColor = '#064e3b';
      let titleColor = '#ecfdf5';

      if (d.isRasulullah) {
        borderColor = '#f59e0b'; // gold
        bgColor = '#451a03';
        titleColor = '#fef3c7';
      } else if (d.isSahabat) {
        borderColor = '#d97706'; // amber
        bgColor = '#78350f';
        titleColor = '#fffbeb';
      } else if (d.isMukharrij) {
        borderColor = '#8b5cf6'; // purple
        bgColor = '#2e1065';
        titleColor = '#f5f3ff';
      } else if (d.statusCategory === 'dhaif') {
        borderColor = '#f43f5e'; // rose
        bgColor = '#4c0519';
        titleColor = '#fff1f2';
      }

      // Rounded container card
      el.append('rect')
        .attr('x', -nodeWidth / 2)
        .attr('y', -nodeHeight / 2)
        .attr('width', nodeWidth)
        .attr('height', nodeHeight)
        .attr('rx', 14)
        .attr('fill', bgColor)
        .attr('stroke', borderColor)
        .attr('stroke-width', d.id === selectedNode?.id ? 3.5 : 2)
        .attr('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))')
        .attr('class', 'hover:brightness-110 transition-all');

      // Top Header Pill: Thabaqah / Role
      el.append('rect')
        .attr('x', -nodeWidth / 2 + 10)
        .attr('y', -nodeHeight / 2 + 6)
        .attr('width', nodeWidth - 20)
        .attr('height', 16)
        .attr('rx', 8)
        .attr('fill', 'rgba(0,0,0,0.35)');

      el.append('text')
        .attr('x', 0)
        .attr('y', -nodeHeight / 2 + 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('font-weight', '600')
        .attr('fill', borderColor)
        .text(d.thabaqah);

      // Arabic Name
      el.append('text')
        .attr('x', 0)
        .attr('y', -nodeHeight / 2 + 38)
        .attr('text-anchor', 'middle')
        .attr('font-family', "'Amiri', 'Traditional Arabic', serif")
        .attr('font-size', '15px')
        .attr('font-weight', 'bold')
        .attr('fill', '#ffffff')
        .text(d.nameArabic.length > 28 ? d.nameArabic.slice(0, 26) + '...' : d.nameArabic);

      // Transliterated Latin Name
      el.append('text')
        .attr('x', 0)
        .attr('y', -nodeHeight / 2 + 54)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', '600')
        .attr('fill', titleColor)
        .text(d.name.length > 26 ? d.name.slice(0, 24) + '...' : d.name);

      // Bottom Status Badge
      el.append('text')
        .attr('x', 0)
        .attr('y', -nodeHeight / 2 + 70)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('fill', '#94a3b8')
        .text(d.statusLabel.length > 32 ? d.statusLabel.slice(0, 30) + '...' : d.statusLabel);
    });

    // Auto-fit / Center initial viewport
    const totalGraphHeight = isTB ? 100 + nodeCount * (nodeHeight + gap) : containerHeight;
    const initialScale = Math.min(
      1,
      Math.max(0.45, containerHeight / (totalGraphHeight + 60))
    );

    const initialX = isTB 
      ? containerWidth / 2 - (containerWidth / 2) * initialScale 
      : 50;
    const initialY = 30;

    const initialTransform = d3.zoomIdentity
      .translate(initialX, initialY)
      .scale(initialScale);

    svg.call(zoom.transform, initialTransform);

  }, [isOpen, layoutDirection, graphData, selectedNode?.id]);

  // Zoom control handlers
  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(250).call(zoomBehaviorRef.current.scaleBy, 1.25);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(250).call(zoomBehaviorRef.current.scaleBy, 0.8);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth || 800;
    const containerHeight = containerRef.current.clientHeight || 500;
    const initialTransform = d3.zoomIdentity.translate(containerWidth * 0.1, 20).scale(0.85);
    d3.select(svgRef.current).transition().duration(350).call(zoomBehaviorRef.current.transform, initialTransform);
  };

  if (!isOpen) return null;

  const rawiBio: RawiProfile | undefined = selectedNode?.rawiId
    ? RAWI_PROFILES.find(r => r.id === selectedNode.rawiId)
    : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="modal-sanad-graph"
        className="w-full max-w-7xl h-[92vh] max-h-[950px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all"
        style={{
          backgroundColor: 'var(--syamila-surface)',
          borderColor: 'var(--syamila-border)',
          color: 'var(--syamila-text)'
        }}
      >
        {/* Top Header Bar */}
        <div 
          className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/40 via-amber-950/20 to-emerald-950/40"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/30">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  Visualisasi Bagan Sanad (D3.js)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  {graphData.ittishalSanad}
                </span>
              </div>
              <p className="text-xs opacity-75 mt-0.5 flex items-center gap-1.5">
                <span>{activeHadith.kitabName} No. {activeHadith.number}</span>
                <span>•</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{activeHadith.derajat}</span>
                <span>•</span>
                <span>Sahabat: {activeHadith.rawiSahabat}</span>
              </p>
            </div>
          </div>

          {/* Quick Hadith Switcher & Controls */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold opacity-80 hidden md:inline">
              Pilih Hadits:
            </label>
            <select
              id="select-sanad-hadith"
              value={selectedHadithId}
              onChange={(e) => {
                setSelectedHadithId(e.target.value);
                const found = HADITH_DATABASE.find(h => h.id === e.target.value);
                if (found && onSelectHadith) onSelectHadith(found);
              }}
              className="text-xs font-semibold py-1.5 px-2.5 rounded-lg border bg-black/5 dark:bg-white/5 cursor-pointer max-w-[180px] sm:max-w-[240px] truncate"
              style={{ borderColor: 'var(--syamila-border)' }}
            >
              {HADITH_DATABASE.slice(0, 15).map(h => (
                <option key={h.id} value={h.id} className="bg-stone-900 text-stone-100">
                  {h.kitabName} #{h.number} - {h.chapterTitle.slice(0, 28)}
                </option>
              ))}
            </select>

            {/* Layout Toggle */}
            <button
              id="btn-toggle-layout-dir"
              onClick={() => setLayoutDirection(prev => prev === 'TB' ? 'LR' : 'TB')}
              className="p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              style={{ borderColor: 'var(--syamila-border)' }}
              title={`Ubah Arah Aliran Sanad (Saat ini: ${layoutDirection === 'TB' ? 'Vertikal Atas-Bawah' : 'Horizontal Kiri-Kanan'})`}
            >
              {layoutDirection === 'TB' ? <ArrowDown className="w-3.5 h-3.5 text-amber-500" /> : <ArrowRight className="w-3.5 h-3.5 text-amber-500" />}
              <span className="hidden sm:inline">{layoutDirection === 'TB' ? 'Vertikal' : 'Horizontal'}</span>
            </button>

            {/* Close Button */}
            <button
              id="btn-close-sanad-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Tutup visualisasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area: Graph Canvas + Side Inspection Panel */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* D3 Canvas Section */}
          <div ref={containerRef} className="flex-1 relative overflow-hidden bg-stone-950/90 select-none">
            {/* SVG Element */}
            <svg 
              ref={svgRef} 
              id="sanad-d3-canvas"
              className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Canvas Floating Controls */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-xl border border-stone-700/60 shadow-xl z-10">
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Perbesar (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Perkecil (Zoom Out)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Reset Posisi (Fit View)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Color Legend */}
            <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-700/60 shadow-xl z-10 text-[10px] hidden sm:flex items-center gap-3 text-stone-300">
              <span className="font-semibold text-stone-400">Keterangan:</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Rasulullah / Sahabat</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Tsiqah Tsabat</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>Mukharrij Kitab</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-0.5 bg-amber-500"></span>
                <span>Shighah Tahammul</span>
              </div>
            </div>

            {/* Hint overlay */}
            <div className="absolute top-3 right-3 text-[11px] text-stone-400/80 bg-stone-900/80 px-2.5 py-1 rounded-lg border border-stone-800 pointer-events-none hidden md:block">
              💡 Geser kanvas & klik kotak perawi untuk detail biografi Jarh wa Ta'dil
            </div>
          </div>

          {/* Right Inspection & Analysis Panel */}
          <div 
            className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l overflow-y-auto p-4 space-y-4 transition-colors"
            style={{ 
              borderColor: 'var(--syamila-border)',
              backgroundColor: 'var(--syamila-surface)'
            }}
          >
            {/* Selected Node Details Card */}
            {selectedNode ? (
              <div 
                className="p-4 rounded-xl border space-y-3 bg-black/5 dark:bg-white/5"
                style={{ borderColor: 'var(--syamila-border)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      {selectedNode.thabaqah}
                    </span>
                    <h4 className="font-bold text-base mt-1 leading-tight">
                      {selectedNode.name}
                    </h4>
                    <p className="font-arabic text-sm opacity-80 mt-0.5 text-right font-medium">
                      {selectedNode.nameArabic}
                    </p>
                  </div>
                  {selectedNode.isSahabat && (
                    <Award className="w-6 h-6 text-amber-500 shrink-0" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
                  <div>
                    <span className="opacity-60 text-[10px] block">Status Ta'dil / Jarh</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {selectedNode.statusLabel}
                    </span>
                  </div>
                  <div>
                    <span className="opacity-60 text-[10px] block">Tahun Wafat</span>
                    <span className="font-semibold">
                      {selectedNode.deathYear || 'Masa Tabi\'in'}
                    </span>
                  </div>
                </div>

                {/* Additional details if mapped to RawiProfile */}
                {rawiBio && (
                  <div className="space-y-2 pt-2 border-t text-xs leading-relaxed" style={{ borderColor: 'var(--syamila-border)' }}>
                    {rawiBio.nasab && (
                      <div>
                        <span className="opacity-60 text-[10px] block">Nasab / Domicile</span>
                        <span className="opacity-90">{rawiBio.nasab} ({rawiBio.domicile})</span>
                      </div>
                    )}

                    {rawiBio.biographySummary && (
                      <div>
                        <span className="opacity-60 text-[10px] block font-semibold mb-0.5">Ringkasan Tarjamah:</span>
                        <p className="opacity-80 text-[11px] leading-relaxed">
                          {rawiBio.biographySummary}
                        </p>
                      </div>
                    )}

                    {rawiBio.aqwalAimmah && rawiBio.aqwalAimmah.length > 0 && (
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg space-y-1">
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 block">
                          Komentar Imam Naqqad ({rawiBio.aqwalAimmah[0].imam}):
                        </span>
                        <p className="text-[11px] italic opacity-90 font-serif">
                          "{rawiBio.aqwalAimmah[0].indonesia}"
                        </p>
                      </div>
                    )}

                    {onOpenRawiDetail && (
                      <button
                        id="btn-view-full-rawi-bio"
                        onClick={() => {
                          onOpenRawiDetail(rawiBio.id);
                        }}
                        className="w-full mt-2 py-2 px-3 rounded-lg text-xs font-semibold bg-amber-600/15 hover:bg-amber-600/25 text-amber-800 dark:text-amber-200 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Buka Biografi Rinci di Modul Jarh wa Ta'dil</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-xs opacity-60 italic">
                Klik salah satu simpul (node) perawi pada bagan untuk membaca biografi rijal dan akreditasi Jarh wa Ta'dil.
              </div>
            )}

            {/* Analysis & Ittishal Explanation Box */}
            <div 
              className="p-4 rounded-xl border space-y-2.5 bg-gradient-to-br from-amber-500/5 to-emerald-500/5"
              style={{ borderColor: 'var(--syamila-border)' }}
            >
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Analisis Keutuhan Sanad (Ittishal)</span>
              </div>
              <p className="text-xs leading-relaxed opacity-85">
                {graphData.ittishalExplanation}
              </p>
              {graphData.kaidahJarh && (
                <div className="pt-2 border-t text-[11px] opacity-80" style={{ borderColor: 'var(--syamila-border)' }}>
                  <span className="font-semibold block text-amber-800 dark:text-amber-300 mb-0.5">
                    Kaidah Musthalah & Jarh wa Ta'dil:
                  </span>
                  <span>{graphData.kaidahJarh}</span>
                </div>
              )}
            </div>

            {/* Hadith Matan Text Preview */}
            <div 
              className="p-3.5 rounded-xl border space-y-2 bg-black/5 dark:bg-white/5 text-xs"
              style={{ borderColor: 'var(--syamila-border)' }}
            >
              <div className="flex items-center justify-between opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <span>Matan Sabda Rasulullah ﷺ</span>
                <span>{activeHadith.kitabName} #{activeHadith.number}</span>
              </div>
              <p className="font-arabic text-sm text-right leading-loose opacity-95">
                {activeHadith.arab.length > 180 ? activeHadith.arab.slice(0, 180) + '...' : activeHadith.arab}
              </p>
              <p className="opacity-80 text-[11px] leading-relaxed pt-1 border-t" style={{ borderColor: 'var(--syamila-border)' }}>
                "{activeHadith.terjemah.length > 160 ? activeHadith.terjemah.slice(0, 160) + '...' : activeHadith.terjemah}"
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div 
          className="px-4 py-2.5 border-t bg-black/5 dark:bg-white/5 flex flex-wrap items-center justify-between text-xs opacity-80 gap-2"
          style={{ borderColor: 'var(--syamila-border)' }}
        >
          <div className="flex items-center gap-2 text-[11px]">
            <GitBranch className="w-3.5 h-3.5 text-amber-500" />
            <span>Peta Sanad D3.js: {graphData.nodes.length} Tingkat Transmisi • {graphData.links.length} Tali Sanad Periwayatan</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
